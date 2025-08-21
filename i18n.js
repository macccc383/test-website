
// --- i18n dictionary (EN / JA / VI) ---
const dict = {
  en: {
    nav: { home:"Home", catalogues:"Catalogues", contact:"Contact", language:"Language" },
    hero: { title:"Kentack", cta:"Browse Catalogues" },
    pages: { home:"Welcome to Kentack", catalogues:"Catalogues", contact:"Contact Kentack" },
    contact: { name:"Your name", email:"Email", message:"Message", send:"Send" }
  },
  ja: {
    nav: { home:"ホーム", catalogues:"カタログ", contact:"お問い合わせ", language:"言語" },
    hero: { title:"Kentack", cta:"カタログを見る" },
    pages: { home:"Kentackへようこそ", catalogues:"カタログ", contact:"Kentackにお問い合わせ" },
    contact: { name:"お名前", email:"メール", message:"メッセージ", send:"送信" }
  },
  vi: {
    nav: { home:"Trang chủ", catalogues:"Danh mục", contact:"Liên hệ", language:"Ngôn ngữ" },
    hero: { title:"Kentack", cta:"Xem danh mục" },
    pages: { home:"Chào mừng đến Kentack", catalogues:"Danh mục", contact:"Liên hệ Kentack" },
    contact: { name:"Họ tên", email:"Email", message:"Tin nhắn", send:"Gửi" }
  }
};

// helpers
const $ = (sel, p=document) => p.querySelector(sel);
const $$ = (sel, p=document) => [...p.querySelectorAll(sel)];

function applyText(lang) {
  const t = dict[lang] || dict.en;
  $$("[data-i18n]").forEach(el => {
    const path = el.getAttribute("data-i18n").split(".");
    let cur = t;
    for (const p of path) cur = (cur||{})[p];
    if (typeof cur === "string") el.textContent = cur;
  });
  document.documentElement.lang = lang;
  localStorage.setItem("kentack_lang", lang); // persists across pages & sessions

  // ensure navigation links carry the current language
  $$("nav a").forEach(a => {
    const url = new URL(a.getAttribute("href"), location.href);
    url.searchParams.set("lang", lang);
    a.setAttribute("href", url.pathname + url.search);
  });

  // update current URL without reloading
  const cur = new URL(location.href);
  cur.searchParams.set("lang", lang);
  history.replaceState(null, "", cur.pathname + cur.search);
}

function initI18n() {
  const params = new URLSearchParams(location.search);
  const paramLang = params.get("lang");
  if (paramLang) localStorage.setItem("kentack_lang", paramLang);
  const saved = paramLang || localStorage.getItem("kentack_lang");
  const prefer = (navigator.language||"en").slice(0,2);
  const lang = saved || (["en","ja","vi"].includes(prefer) ? prefer : "en");
  const select = $("#lang");
  if (select) {
    select.value = lang;
    select.addEventListener("change", e => applyText(e.target.value));
  }
  applyText(lang);
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();

  // Optional: mark active nav link
  const here = location.pathname.split("/").pop() || "index.html";
  $$("nav a").forEach(a => {
    const url = new URL(a.getAttribute("href"), location.href);
    if (url.pathname.split("/").pop() === here) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", initI18n);


