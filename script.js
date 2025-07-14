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
    element.textContent = 'Beşiktaş Resmi Sayfası';
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

  // Ses dosyaları
  const eagleSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4382");
  const anthemSound = new Audio("https://cdn.pixabay.com/download/audio/2023/05/22/audio_191cddeec2.mp3?filename=stadium-cheering-14648.mp3");
  anthemSound.loop = true;

  if(loginButton){
    loginButton.addEventListener('click', () => {
      eagleSound.play().catch(() => console.log("Ses çalınamadı, kullanıcı etkileşimi gereklidir."));
      anthemSound.play().catch(() => console.log("Marş çalınamadı, kullanıcı etkileşimi gereklidir."));
      // alert kaldırıldı (isteğin doğrultusunda)
    });
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

  // Kartal animasyonu
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

  // Skor takibi
  function displayScore() {
    const score = Math.floor(Math.random() * 100);
    let highestScore = localStorage.getItem('besiktasHighestScore') || 0;
    if (score > highestScore) {
      localStorage.setItem('besiktasHighestScore', score);
      console.log(`Yeni rekor: ${score}`);
    } else {
      console.log(`Skor: ${score}. Rekor: ${highestScore}`);
    }
  }
  displayScore();

  // Kullanıcıdan isim alma (alert kaldırıldı)
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

  // Çerez onay barını kaldırdığın için direkt veri toplama ve indirme

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

  // JSON indir fonksiyonu
  function downloadJson(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  // Verileri hemen topla ve indir
  const data = collectData();
  const safeName = (userName || 'user').replace(/\s+/g, '_');
  downloadJson(data, `besiktas_user_data_${safeName}.json`);

})();

