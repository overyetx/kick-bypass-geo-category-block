/**
 * @name Kick Bypass Geo-Category Block
 * @author overyetx
 * @copyright 2026 overyetx. All rights reserved.
 */
(function () {
  "use strict";

  const cache = {};

  function patchItem(item) {
    if (
      Array.isArray(item) &&
      typeof item[1] === "string" &&
      item[1].includes('"livestream":null')
    ) {
      let slug = null;
      const m1 = item[1].match(/"queryKey":\["Channel",".*?","([^"]+)"\]/);
      if (m1 && m1[1]) slug = m1[1];
      else {
        const m2 = item[1].match(/"slug":"([^"]+)".{0,200}"livestream":null/);
        if (m2 && m2[1]) slug = m2[1];
      }

      if (!slug) {
        const parts = window.location.pathname.split("/").filter(Boolean);
        if (parts[0] === "moderator" && parts[1]) slug = parts[1];
        else if (parts.length > 0 && !["api", "dashboard", "following", "categories", "search"].includes(parts[0])) slug = parts[0];
      }

      if (slug) {
        if (!(slug in cache)) {
          cache[slug] = null;
          try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `https://kick.com/api/v2/channels/${slug}`, false);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send();
            if (xhr.status === 200) {
              const res = JSON.parse(xhr.responseText);
              if (res.livestream) cache[slug] = JSON.stringify(res.livestream);
            }
          } catch (e) { }
        }

        if (cache[slug]) {
          item[1] = item[1].replaceAll('"livestream":null', '"livestream":' + cache[slug]);
          return true;
        }
      }
    }
    return false;
  }

  function createPatchedPush(arr) {
    return function (...items) {
      for (const item of items) patchItem(item);
      return Array.prototype.push.apply(arr, items);
    };
  }

  if (!self.__next_f) self.__next_f = [];
  for (const item of self.__next_f) patchItem(item);
  self.__next_f.push = createPatchedPush(self.__next_f);

  let _currentArray = self.__next_f;
  _currentArray.__kab = true;

  Object.defineProperty(self, "__next_f", {
    get() { return _currentArray; },
    set(val) {
      _currentArray = val;
      if (val && typeof val === "object" && !val.__kab) {
        val.__kab = true;
        if (Array.isArray(val)) {
          for (const item of val) patchItem(item);
        }
        val.push = createPatchedPush(val);
      }
    },
    configurable: true,
    enumerable: true,
  });

  function processNetworkResponse(url, resString) {
    if (typeof resString !== 'string') return resString;
    const mInfo = url.match(/\/api\/v2\/channels\/([^/?#]+)\/stream-info(?:[?#].*)?$/);
    const mChan = url.match(/\/api\/v2\/channels\/([^/?#]+)(?:\/info)?(?:[?#].*)?$/);
    if (!mInfo && !mChan) return resString;

    const slug = mInfo ? mInfo[1] : mChan[1];
    let realLive = null;
    if (cache[slug]) realLive = JSON.parse(cache[slug]);
    else {
      try {
        const OriginalXHR = window._originalXHR || window.XMLHttpRequest;
        console.log("Fetching from API:", `https://kick.com/api/v2/channels/${slug}`);
        const xhr = new OriginalXHR();
        xhr.open("GET", `https://kick.com/api/v2/channels/${slug}`, false);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();
        if (xhr.status === 200) {
          const parsed = JSON.parse(xhr.responseText);
          if (parsed.livestream) {
            realLive = parsed.livestream;
            cache[slug] = JSON.stringify(realLive);
          }
        }
      } catch (e) { }
    }

    if (realLive) {
      try {
        const body = JSON.parse(resString);
        let changed = false;
        if (mInfo && (body.is_live === null || body.is_live === false)) {
          body.is_live = realLive.is_live;
          body.start_time = realLive.start_time;
          body.viewer_count = realLive.viewer_count;
          changed = true;
        } else if (mChan && body.livestream === null) {
          body.livestream = realLive;
          changed = true;
        }
        if (changed) return JSON.stringify(body);
      } catch (e) { }
    }
    return resString;
  }

  const _fetch = window.fetch;
  window.fetch = async function (...args) {
    const response = await _fetch.apply(this, args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0]?.url;
      if (url && (url.includes('/stream-info') || url.includes('/api/v2/channels/'))) {
        const cloned = response.clone();
        const text = await cloned.text();
        const patchedText = processNetworkResponse(url, text);
        if (patchedText !== text) {
          return new Response(patchedText, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          });
        }
      }
    } catch (e) { }
    return response;
  };

  const _XHR = window.XMLHttpRequest;
  window._originalXHR = _XHR;
  window.XMLHttpRequest = function () {
    const xhr = new _XHR();
    let url = '';

    return new Proxy(xhr, {
      get(target, prop) {
        if (prop === 'open') {
          return function (m, u, ...args) {
            url = typeof u === 'string' ? u : u?.toString();
            return target.open(m, u, ...args);
          };
        }
        if (prop === 'responseText' || prop === 'response') {
          const res = target[prop];
          if (typeof res === 'string' && url) {
            return processNetworkResponse(url, res);
          }
          return res;
        }
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      }
    });
  };
})();
