# 🎬 Kampüs Film Kulübü - Dizi/Film İzleme Platformu
✨ React useReducer ve TVMaze API ile Güçlendirilmiş Film Koleksiyonu Yönetimi ✨

---

## 🚀 Proje Tanımı
Bu proje, Süleyman Demirel Üniversitesi Web Teknolojileri ve Programlama dersi kapsamında geliştirilmiştir. TVMaze Public API verilerini kullanarak, arama, detaylı filtreleme ve gösterime girecekler (watchlist) özelliklerini içeren, güçlü bir React tabanlı web uygulamasıdır.

---

## 🎯 Temel Amaç
Uygulamanın temel amacı, kullancıların haftalık gösterim listelerini oluşturmalarını kolaylaştırmak; geniş bir dizi veritabanında kolayca arama yapmalarına, sonuçları birden fazla kritere göre filtrelemelerine ve seçtikleri dizileri izleme listesine eklemelerine olanak tanımaktır.

---

## ⭐ Ana Özellikler (Key Features)

| Simge | Özellik Adı | Açıklama |
|-------|------------|---------|
| 🔄 | Merkezi State Yönetimi | Uygulamanın tüm durumu (veri, filtreler, arama sorgusu, izleme listesi) `useReducer` ve `Context API` kullanılarak merkezi olarak yönetilir. |
| 🔍 | Akıllı Arama Mantığı | (1) Default: Uygulama açılışında "friends" sonuçlarını getirir. (2) Temizleme: Arama kutusu temizlenirse, listeyi boşaltmak yerine çeşitli türlerden oluşan geniş bir Default Listeye otomatik olarak döner. |
| 🏷️ | Çoklu Filtreleme | Sonuçları Tür (Genre), Minimum Puan (Min Rating) ve Dil (Language) olmak üzere üç farklı kritere göre aynı anda süzebilme yeteneği. |
| 🎞️ | Detay Sayfaları | Her dizi için ayrı bir ShowDetail sayfası mevcuttur. Diziye ait özet, detay bilgiler ve bölümlerin sezonlara göre gruplanmış listesi gösterilir. |
| 📅 | Gösterim Listesi (Watchlist) | Seçilen dizileri tek tıklama ile sağ paneldeki kısa listeye ekleme ve çıkarma (Add/Remove) işlevselliği. |
| 📑 | Sayfalandırma (Pagination) | Uzun sonuç listelerinin, daha iyi kullanıcı deneyimi için sayfalar halinde (6 öge/sayfa) gösterilmesi ve sayfa navigasyonunun sağlanması. |
| 💡 | Koşullu Renderlama | Veri yüklenirken "Yükleniyor...", hata durumunda "Hata!" ve sonuç bulunamadığında uygun bileşenleri gösterir. |

---

## 🛠️ Kullanılan Teknolojiler

- **React.js**: Uygulamanın temel çatısını oluşturan kütüphane  
- **useReducer & Context API**: Karmaşık state yapısının yönetimi  
- **Axios**: TVMaze API'ye asenkron veri istekleri yapmak için  
- **react-router-dom**: Detay sayfaları ve uygulama içi yönlendirme için  
- **TVMaze API**: Tüm dizi verilerinin çekildiği harici REST API  
- **GitHub Pages**: Canlı yayımlama ve Continuous Deployment için  

---

## 📝 Proje Notları

- Bu uygulama, Süleyman Demirel Üniversitesi Web Teknolojileri ve Programlama dersi kapsamında verilen tüm zorunlu React kavramlarını (`useReducer`, `useEffect`, `Context API`, `Axios`) uygulayarak geliştirilmiştir.  
- Özellikle, arama kutusu temizlendiğinde istenen "tüm çeşit filmler" listesi, kod içinde birden fazla popüler arama sorgusunun sonuçlarının toplanıp birleştirilmesiyle (`Promise.all` ve `Array.flat()`) elde edilmiştir.

---

## 👨‍💻 Geliştirici

| İsim | GitHub Profili | LinkedIn Profili |
|------|---------------|----------------|
| Barış Saylık | [github.com/gfbaris](https://github.com/gfbaris) |[Barış Saylık](https://www.linkedin.com/in/bar%C4%B1%C5%9F-sayl%C4%B1k-85427b293/) |

---

## 🔗 Canlı Uygulama

Bu projeyi canlı olarak görüntülemek için aşağıdaki bağlantıyı kullanabilirsiniz:  

🌐 [Uygulamayı Görüntüle](https://gfbaris.github.io/KampusFilmKulubu/)
