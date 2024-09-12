Community Edition Kurulum Rehberi (Markdown Formatında)
Bu rehberde, Greenbone Community Edition dokümantasyonunu yerel olarak kurmak için adım adım talimatlar bulacaksın. İlk olarak, sanal bir makine (VM) üzerinde Linux kurulumu yapacak ve sonrasında gerekli bağımlılıkları kurarak dokümantasyonu oluşturacağız.

1. Sanal Makine (VM) Üzerinde Linux Kurulumu
Greenbone Community Edition'ı çalıştırmak için önce bir sanal makine (VM) oluşturmalısın. VM üzerine Linux dağıtımı kuracağız. Aşağıda VirtualBox kullanarak bir VM kurulumunu anlatıyorum.

1.1. VirtualBox ve Linux ISO Kurulumu
VirtualBox'ı indir ve kur: VirtualBox İndir
Linux ISO dosyasını indir: Örneğin, Ubuntu 22.04 kullanabilirsin. Ubuntu İndir
1.2. VM Oluşturma
VirtualBox'ı aç ve Yeni butonuna tıkla.
Ad: Ubuntu veya tercih ettiğin Linux dağıtımının adı.
Tip: Linux.
Versiyon: Ubuntu (64-bit).
Bellek (RAM): En az 2048 MB önerilir.
Sanal Sabit Disk: En az 20 GB önerilir (dinamik tahsisli olabilir).
1.3. Linux Kurulumu
VM'i başlat ve indirdiğin Ubuntu ISO dosyasını seç.
Ekrandaki talimatları takip ederek Linux'u kur.
Kurulum tamamlandıktan sonra VM'yi yeniden başlat.
2. Sanal Ortamda Greenbone Community Edition Kurulumu
2.1. Gereksinimler
Greenbone Community Edition'ı kurmak için aşağıdaki yazılımlar gereklidir:

Python 3.9 veya üstü
Poetry bağımlılık yönetim aracı
2.2. Python ve Gerekli Araçları Yükleme
Ubuntu üzerinde Python ve diğer araçları kurmak için aşağıdaki adımları takip et:

sh
Kodu kopyala
sudo apt update
sudo apt install python3 python3-pip python3-venv -y
2.3. pipx ve Poetry Kurulumu
Poetry'yi kurmak için önce pipx'i kuracağız:

pipx'i kur:

sh
Kodu kopyala
sudo apt install pipx
Poetry'yi pipx ile kur:

sh
Kodu kopyala
python3 -m pipx install poetry
3. Greenbone Community Edition Bağımlılıklarının Kurulumu
Şimdi Greenbone projesi için gerekli olan bağımlılıkları kuracağız.

Proje dosyalarının bulunduğu dizine git:

sh
Kodu kopyala
cd /path/to/greenbone-community-edition
Bağımlılıkları kurmak için Poetry kullan:

sh
Kodu kopyala
poetry install
Bu komutu haftada bir çalıştırarak bağımlılıkları güncel tutman önerilir.

4. Dokümantasyonu Oluşturma
Bağımlılıkları kurduktan sonra, Greenbone dokümantasyonunu HTML formatında oluşturabiliriz.

4.1. Manuel Dokümantasyon Oluşturma
Dokümantasyonu oluşturmak için şu komutu çalıştır:

sh
Kodu kopyala
poetry run make html
Bu işlem tamamlandığında, oluşturulan dokümantasyonu tarayıcıda görüntülemek için:

sh
Kodu kopyala
firefox _build/html/index.html
4.2. Otomatik Yeniden Oluşturma (Live Server)
Dokümantasyon üzerinde çalışıyorsan ve her değişiklikten sonra otomatik olarak yeniden oluşturulmasını istiyorsan şu komutu çalıştır:

sh
Kodu kopyala
poetry run make livehtml
Tarayıcıda görüntülemek için:

sh
Kodu kopyala
firefox http://127.0.0.1:8000
5. Sanal Ortamı Yeniden Başlatma (Temiz Kurulum)
Eğer herhangi bir sorun yaşarsan veya bağımlılıkları sıfırlamak istersen, sanal ortamı silip yeniden oluşturabilirsin.

5.1. Sanal Ortamı Proje İçinde Yapılandırma
Öncelikle sanal ortamın proje klasörü içinde yer almasını sağla:

sh
Kodu kopyala
poetry config virtualenvs.in-project true
5.2. Sanal Ortamı Silme
Sanal ortamı ve bağımlılıkları tamamen silmek için:

sh
Kodu kopyala
rm -rf .venv
Sonrasında, bağımlılıkları yeniden kurmak için:

sh
Kodu kopyala
poetry install
Ek Bilgiler
Poetry Belgelendirme: Poetry Resmi Sitesi
pipx Kullanımı: pipx Resmi Sitesi
