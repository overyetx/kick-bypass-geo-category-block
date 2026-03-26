# Kick Bypass Geo-Category Block

[🌍 English Version](README_EN.md)

Kick.com üzerindeki coğrafi engellemelere takılan yayın kategorilerini ve "offline" hatasını atlatmaya yarayan bir Chrome/Chromium tarayıcı eklentisidir.

Kick.com, belirli ülkelerde bazı yayın kategorilerini sansürlediğinde, yayıncı canlı yayında olsa bile sayfa yüklendiğinde yayın verisi eksik (null) gönderilir. Bu eklenti araya girerek eksik olan kanal ve yayın bilgilerini doğrudan Kick'in ana API'si üzerinden tekrar çeker ve sayfa yüklenmeden yerine koyar.

## 🔒 Gizlilik ve Sorumluluk Reddi

- **VPN veya Proxy Kullanmaz:** Eklenti bağlantınızı yönlendirmez, gecikme yaratan veya bant genişliğinizi çalan bir VPN/Proxy ağı kullanmaz. Sadece eksik JSON verilerini tamamlar. Yayını kendi normal hızınızla, her zamanki gibi doğrudan Kick sunucularından izlemeye devam edersiniz.
- **Gizlilik Odaklı:** Bu eklenti **yalnızca tarayıcınızın içinde, yerel olarak** çalışır. Verileriniz hiçbir şekilde harici sunuculara veya üçüncü şahıslara **gönderilmez**. Eksik değerleri manipüle etmek için gerekli olan bilgileri doğrudan Kick.com'un kendi sunucularından çeker.
- **Resmi Değildir:** Bu projenin hiçbir şekilde Kick.com ile **bağlantısı, ortaklığı veya onayı yoktur.**
- **Tüm Sorumluluk Size Aittir:** Bu eklenti "olduğu gibi" ve hiçbir garanti olmaksızın sunulmaktadır. Eklentinin kullanımından veya kötüye kullanımından doğacak hiçbir yasal sorumluluk yazar(lar)a ait değildir. Bu yazılımı kullanarak tüm olası sonuçları kendi sorumluluğunuza aldığınızı kabul etmiş olursunuz.

## 🛠️ Kurulum

1. [Releases](../../releases) sayfasından en güncel `.zip` dosyasını bilgisayarınıza indirin.
2. İndirdiğiniz ZIP dosyasını klasöre çıkartın (veya direkt bu repoyu klonlayın/indirin).
3. Tarayıcınızda `chrome://extensions` (Uzantılar) sayfasını açın.
4. Sağ üst köşeden **Geliştirici modunu (Developer mode)** aktif edin.
5. Sol üstte beliren **Paketlenmemiş öğe yükle (Load unpacked)** butonuna tıklayıp projeyi çıkarttığınız (içinde `manifest.json` olan) klasörü seçin.

## ⚙️ Nasıl Çalışıyor?

Tarayıcınızın Kick.com'a attığı ağ isteklerini (Network requests) araya girerek dinler. Eksik (`/stream-info`, `/info` veya benzer end-point'ler) yayın verisi algıladığında, güvenli biçimde arka planda gerçek verileri bulup eksik değerleri (`is_live`, izleyici sayısı vb.) siz daha sayfayı görmeden makinenizin içinde lokal olarak tekrar yerine koyar.

## ⚠️ Dağıtım Uyarısı (Distribution Warning)

Bu eklenti Chrome Web Mağazası dahil hiçbir yerde, başka sitelerde veya herhangi bir platformda kopyalanıp **dağıtılamaz**, satılamaz veya kendi adınıza yayınlanamaz. Eklentinin tek resmi indirme kaynağı **sadece bu GitHub deposudur.**
