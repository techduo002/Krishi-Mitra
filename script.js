document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle
  const sidebar = document.getElementById('sidebar');
  const openSidebarBtn = document.getElementById('open-sidebar');
  const toggleSidebarBtn = document.getElementById('toggle-sidebar');

  openSidebarBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = translations[currentLanguage].light_mode || 'Light Mode';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    themeToggle.textContent = isDarkMode
      ? translations[currentLanguage].light_mode || 'Light Mode'
      : translations[currentLanguage].dark_mode || 'Dark Mode';
  });

  // Language Translation
  const translations = {
    en: {
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      profile: 'Profile',
      login_profile: 'Login / Profile',
      dark_mode: 'Dark Mode',
      light_mode: 'Light Mode',
      krishimitra: 'KrishiMitra',
      home: 'Home',
      features: 'Features',
      marketplace: 'Marketplace',
      about: 'About',
      contact: 'Contact',
      hero_title: 'Empowering Farmers with Smart Agriculture',
      hero_desc: 'AI-based crop insights, disease detection, and market guidance – from sowing to selling.',
      lets_grow: 'Let’s Grow',
      key_features: 'Our Key Features',
      rogi_scan: 'Rogi Scan',
      rogi_scan_desc: 'Instant crop disease detection with AI guidance.',
      kisan_sathi: 'Kisan Sathi',
      kisan_sathi_desc: 'Ask farming questions in Hindi or English via chatbot.',
      beej_setu: 'Beej Setu',
      beej_setu_desc: 'Smart crop recommendations for best yield.',
      anaaj_bazaar: 'Anaaj Bazaar',
      anaaj_bazaar_desc: 'Get fair market prices and trends for your crops.',
      yantramitra: 'YantraMitra',
      yantramitra_desc: 'Rent farming tools nearby, save time and money.',
      marketplace_demo: 'Marketplace Demo',
      wheat_price: 'Wheat - ₹2200/qtl',
      rice_price: 'Rice - ₹1850/qtl',
      maize_price: 'Maize - ₹1600/qtl',
      about_krishimitra: 'About KrishiMitra',
      about_desc: 'Smart tools for crop selection, disease detection, AI assistance, and marketplace insights to make farming smarter, sustainable, and profitable.',
      contact_us: 'Contact Us',
      name: 'Name',
      email: 'Email',
      message: 'Message...',
      send_message: 'Send Message',
      copyright: '© 2025 KrishiMitra | All Rights Reserved.'
    },
    hi: {
      settings: 'सेटिंग्स',
      language: 'भाषा',
      theme: 'थीम',
      profile: 'प्रोफ़ाइल',
      login_profile: 'लॉगिन / प्रोफ़ाइल',
      dark_mode: 'डार्क मोड',
      light_mode: 'लाइट मोड',
      krishimitra: 'कृषिमित्र',
      home: 'होम',
      features: 'विशेषताएँ',
      marketplace: 'बाज़ार',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      hero_title: 'स्मार्ट कृषि के साथ किसानों को सशक्त बनाना',
      hero_desc: 'एआई-आधारित फसल अंतर्दृष्टि, रोग का पता लगाना, और बाज़ार मार्गदर्शन - बुआई से बिक्री तक।',
      lets_grow: 'आइए बढ़ें',
      key_features: 'हमारी प्रमुख विशेषताएँ',
      rogi_scan: 'रोगी स्कैन',
      rogi_scan_desc: 'एआई मार्गदर्शन के साथ तत्काल फसल रोग का पता लगाना।',
      kisan_sathi: 'किसान साथी',
      kisan_sathi_desc: 'हिंदी या अंग्रेजी में चैटबॉट के माध्यम से कृषि प्रश्न पूछें।',
      beej_setu: 'बीज सेतु',
      beej_setu_desc: 'सर्वश्रेष्ठ उपज के लिए स्मार्ट फसल सिफारिशें।',
      anaaj_bazaar: 'अनाज बाज़ार',
      anaaj_bazaar_desc: 'अपनी फसलों के लिए उचित बाज़ार मूल्य और रुझान प्राप्त करें।',
      yantramitra: 'यंत्रमित्र',
      yantramitra_desc: 'नजदीकी कृषि उपकरण किराए पर लें, समय और धन बचाएं।',
      marketplace_demo: 'बाज़ार डेमो',
      wheat_price: 'गेहूं - ₹2200/क्विंटल',
      rice_price: 'चावल - ₹1850/क्विंटल',
      maize_price: 'मक्का - ₹1600/क्विंटल',
      about_krishimitra: 'कृषिमित्र के बारे में',
      about_desc: 'फसल चयन, रोग का पता लगाना, एआई सहायता, और बाज़ार अंतर्दृष्टि के लिए स्मार्ट उपकरण, ताकि खेती स्मार्ट, टिकाऊ और लाभकारी हो।',
      contact_us: 'हमसे संपर्क करें',
      name: 'नाम',
      email: 'ईमेल',
      message: 'संदेश...',
      send_message: 'संदेश भेजें',
      copyright: '© 2025 कृषिमित्र | सर्वाधिकार सुरक्षित।'
    }
  };

  let currentLanguage = localStorage.getItem('language') || 'en';
  const languageSelect = document.getElementById('language-select');
  languageSelect.value = currentLanguage;

  function updateContent() {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      element.textContent = translations[currentLanguage][key] || element.textContent;
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      element.placeholder = translations[currentLanguage][key] || element.placeholder;
    });

    document.documentElement.lang = currentLanguage;
  }

  languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('language', currentLanguage);
    updateContent();
  });

  updateContent();
});
