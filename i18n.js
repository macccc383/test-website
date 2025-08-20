<!-- include on every page: <script src="i18n.js" defer></script> -->
<script>
// --- i18n dictionary (EN / JA / VI) ---
const dict = {
  en: {
    nav: { home:"Home", catalogues:"Catalogues", contact:"Contact", language:"Language" },
    hero: { title:"Precision Golf Equipment for Peak Performance", cta:"Browse Catalogues" },
    pages: { home:"Welcome to Kentack", catalogues:"Catalogues", contact:"Contact Kentack" },
    contact: { name:"Your name", email:"Email", message:"Message", send:"Send" }
  },
  ja: {
    nav: { home:"ホーム", catalogues:"カタログ", contact:"お問い合わせ", language:"言語" },
    hero: { title:"最高のパフォーマンスのための精密なゴルフ用品", cta:"カタログを見る" },
    pages: { home:"Kentackへようこそ", catalogues:"カタログ", contact:"Kentackにお問い合わせ" },
    contact: { name:"お名前", email:"メール", message:"メッセージ", send:"送信" }
  },
  vi: {
    nav: { home:"Trang chủ", catalogues:"Danh mục", contact:"Liên hệ", language:"Ngôn ngữ" },
    hero: { title:"Thiết bị golf chính xác cho hiệu suất tối đa", cta:"Xem danh mục" },
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
  localStorage.setItem("kentack_lang", lang); // persists across pages & sessions. :contentReference[oaicite:2]{index=2}
}

function initI18n() {
  const saved = localStorage.getItem("kentack_lang");
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
    const target = a.getAttribute("href");
    if (target && target.endsWith(here)) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", initI18n);
</script>

