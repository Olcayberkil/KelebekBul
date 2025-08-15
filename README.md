#  Çılgın Kelebek Oyunu (Android Versiyonu)

Bu proje, **Boyner** markasına özel hazırlanmış, kullanıcıların ürün kutuları arasından gizli kelebeği bulmaya çalıştığı etkileşimli bir HTML/CSS/JavaScript oyunudur.  
Mobil uyumlu, animasyonlu ve görsel efektlerle zenginleştirilmiştir.

---

##  Oyun Mantığı
- Ekranda **9 adet ürün kutusu** yer alır.
- Kutulardan **yalnızca birinde** kelebek gizlidir.
- Kullanıcı doğru kutuyu seçerse:
  - Kelebek kutudan çıkar.
  - Konfeti animasyonu çalışır.
  - Kazanma ekranı gösterilir.
- Yanlış seçim yapılırsa:
  - Kutu titreme animasyonu oynar.
  - Kaybetme ekranı gösterilir.

---

##  Proje Yapısı

```plaintext
kelebek-oyunu/
 ├── app.android.html     # HTML ana sayfa
 ├── app.android.js       # Oyun mantığı (JavaScript)
 ├── style.android.css    # Görsel tasarım (CSS)
 └── image/               # Görseller (ürün, kelebek, ikon vb.)
