(async () => {
  const body = document.body;
  let isDarkMode = true;

  // Gece-gündüz mod geçişi fonksiyonu
  function toggleDarkMode() {
    if (isDarkMode) {
      body.style.background = 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)';
      body.style.color = '#eee';
    } else {
      body.style.background = 'linear-gradient(135deg, #ffffff, #cfd8dc, #90a4ae)';
      body.style.color = '#222';
    }
  }

  toggleDarkMode();

  setInterval(() => {
    isDarkMode = !isDarkMode;
    toggleDarkMode();
  }, 30000);

  // Admin panel yazısı stil değiştirme (kendi kendine parıldama efekti)
  const adminPanel = document.getElementById('adminPanelLabel');
  let glow = true;
  setInterval(() => {
    if(glow){
      adminPanel.style.boxShadow = '0 0 15px #00bcd4';
      adminPanel.style.color = '#00e5ff';
    } else {
      adminPanel.style.boxShadow = '0 0 10px #00838f';
      adminPanel.style.color = '#00bcd4';
    }
    glow = !glow;
  }, 2000);

  // Form submit işlemi
  const form = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');

  // Ses efektleri
  const loginSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4382");
  const backgroundMusic = new Audio("https://cdn.pixabay.com/download/audio/2023/05/22/audio_191cddeec2.mp3?filename=stadium-cheering-14648.mp3");
  backgroundMusic.loop = true;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (!username || !password) {
      // Basit input kontrolü, gerektiğinde geliştirilebilir
      alert("Lütfen kullanıcı adı ve şifre giriniz.");
      return;
    }

    // Sesleri çal
    loginSound.play().catch(() => console.log("Login sesi oynatılamadı."));
    backgroundMusic.play().catch(() => console.log("Arka plan müziği oynatılamadı."));

    // Kullanıcı ismini ekrana hoşgeldin olarak yaz
    let welcome = document.getElementById('welcomeMessage');
    if(!welcome){
      welcome = document.createElement('h2');
      welcome.id = 'welcomeMessage';
      welcome.style.textAlign = 'center';
      welcome.style.marginTop = '20px';
      welcome.style.color = isDarkMode ? '#eee' : '#222';
      welcome.textContent = `Hoşgeldiniz, ${username}`;
      form.parentNode.appendChild(welcome);
    } else {
      welcome.textContent = `Hoşgeldiniz, ${username}`;
    }

    // Burada API çağrısı veya oturum açma işlemi yapılabilir.

    // Skor simülasyonu (örnek)
    const skor = Math.floor(Math.random() * 100);
    let enYuksek = localStorage.getItem('highestScore') || 0;
    if (skor > enYuksek) {
      localStorage.setItem('highestScore', skor);
      console.log(`🏆 Yeni rekor! Skor: ${skor}`);
    } else {
      console.log(`Skor: ${skor}. Rekor: ${enYuksek}`);
    }
  });
})();
