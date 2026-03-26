# Kick Bypass Geo-Category Block

[🇹🇷 Türkçe Sürüm](README.md)

A Chrome or Chromium based browser extension that bypasses Kick.com's geo-based category restrictions for livestreams.

Some countries restrict certain stream categories on Kick.com, causing the livestream data to be nullified in the server-side rendered page even though the stream is live. This extension fetches the real channel livestream data from Kick's API and patches it into the page before React hydration.

## Privacy & Disclaimer

- **No VPN or Proxy Used:** This extension does not route your traffic or use any lag-inducing VPN/Proxy network. It simply restores missing JSON values locally. You will continue to watch the broadcast at your normal connection speed directly from Kick's servers.
- **Privacy First:** This extension operates entirely locally within your browser. **Your data is never sent to any external servers.** It only intercepts requests to Kick.com and fetches missing channel info directly from Kick's own APIs to manipulate the interface locally.
- **No Affiliation:** This project is **not affiliated with, endorsed by, or associated with Kick.com** in any way.
- **Use at Your Own Risk:** This extension is provided **as-is**, without any warranty. The author(s) accept **no legal responsibility** for the use or misuse of this extension. You are solely responsible for any consequences of using this software.

## Installation

1. Download the latest `.zip` file from the [Releases](../../releases) page, or download/clone this repository.
2. Extract the ZIP file to a folder on your computer.
3. Open `chrome://extensions` in your Chromium-based browser.
4. Enable **Developer mode** (top right toggle).
5. Click the **Load unpacked** button and select the extracted folder (the one containing `manifest.json`).

## How It Works

This extension operates entirely locally by intercepting your browser's network requests to Kick.com. When it detects that livestream data has been nullified due to geo-blocking (`/stream-info`, `/info` or similar endpoints), it securely fetches the real data directly from Kick's API and restores the missing values (`is_live`, `viewer_count`, etc.) before the page renders them.

## ⚠️ Distribution Warning

This extension must **not** be distributed, republished, or made available through any browser extension store, website, or any other channel. The only official source is this GitHub repository.
