document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll("[data-lang]");
  const langCodeEl = document.querySelector(".lang-code");

  // Set initial language from localStorage or default to 'es'
  let currentLang = localStorage.getItem("gestoo_lang") || "es";

  const updateLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem("gestoo_lang", lang);

    // Update active language in dropdown
    if (langCodeEl) {
      langCodeEl.textContent = lang === "es" ? "ES" : "EN";
    }

    // Update all translatable elements
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        // If it's a button or input with placeholder
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  // Initialize language
  updateLanguage(currentLang);

  // Add click listeners to language buttons
  langButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.getAttribute("data-lang");
      if (lang !== currentLang) {
        updateLanguage(lang);
      }
    });
  });
});
