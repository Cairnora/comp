(() => {
  try {
    const storageKey = "akora-language";
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "ko" || saved === "en") {
      window.location.replace("./" + saved + "/index.html" + window.location.search + window.location.hash);
      return;
    }
  } catch {}

  const languages = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language || ""];

  let target = "en";
  for (let i = 0; i < languages.length; i++) {
    const lang = String(languages[i] || "").toLowerCase().trim();
    if (!lang) continue;
    if (lang === "ko" || lang.startsWith("ko-") || lang.startsWith("ko_")) {
      target = "ko";
      break;
    }
    if (lang === "en" || lang.startsWith("en-") || lang.startsWith("en_")) {
      target = "en";
      break;
    }
  }

  window.location.replace("./" + target + "/index.html" + window.location.search + window.location.hash);
})();
