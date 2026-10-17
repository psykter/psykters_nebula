// Psykter's Space — shared site navbar.
// Include with: <script src="js/navbar.js"></script> (or ../js/navbar.js from a subfolder),
// placed where the nav should appear (right after <body>).
// Renders the SAME menu on every page; edit this file to change it everywhere.

(function () {
  'use strict';

  // Site root derived from this script's own URL (navbar.js lives in js/),
  // so links resolve correctly from pages at any depth.
  var ROOT = new URL('../', document.currentScript.src).href;

  var LINKS = [
    { label: 'Home',     file: 'index.html' },
    { label: 'Orbwatch', file: 'orbwatch.html', featured: true },
    { label: 'About',    file: 'about.html' },
    { label: 'Stories',  file: 'stories.html' },
    { label: 'Gallery',  file: 'gallery.html' },
    { label: 'Missions', file: 'missions.html' },
    { label: 'Crew',     file: 'crew.html' }
  ];

  // Detect the current page for the active-link highlight.
  var path = location.pathname;
  var current = path.split('/').pop() || 'index.html';
  if (current === '') current = 'index.html';
  // Story articles highlight "Stories".
  if (path.indexOf('/templates/') !== -1) current = 'stories.html';
  var onIndex = current === 'index.html';

  var CSS = ''
    + '#navbar.psn-nav{position:fixed;top:0;left:0;right:0;z-index:40;'
    + 'background:rgba(0,0,0,.7);border-bottom:1px solid rgba(255,255,255,.1);'
    + 'backdrop-filter:blur(10px);color:#fff;font-family:inherit;}'
    + '#navbar .psn-inner{max-width:80rem;margin:0 auto;padding:.75rem 1.5rem;'
    + 'display:flex;align-items:center;justify-content:space-between;gap:1rem;}'
    + '#navbar .psn-brand{display:flex;align-items:center;gap:.5rem;flex-shrink:0;text-decoration:none;}'
    + '#navbar .psn-brand img{width:2rem;height:2rem;border-radius:9999px;object-fit:cover;}'
    + '#navbar .psn-brand span{font-weight:700;color:#22d3ee;}'
    + '#navbar .psn-links{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;column-gap:1.25rem;row-gap:.5rem;font-size:.875rem;}'
    + '#navbar .psn-links a{color:#d1d5db;text-decoration:none;transition:color .15s;}'
    + '#navbar .psn-links a:hover{color:#22d3ee;}'
    + '#navbar .psn-links a.psn-active{color:#22d3ee;font-weight:500;}'
    + '#navbar .psn-links a.psn-featured{color:#67e8f9;font-weight:600;}'
    + '#navbar .psn-links a.psn-featured:hover{color:#a5f3fc;}'
    + '#navbar .psn-eko{background:#06b6d4;color:#fff;border:none;cursor:pointer;'
    + 'padding:.5rem 1rem;border-radius:9999px;font-size:.875rem;font-weight:500;transition:background .15s;}'
    + '#navbar .psn-eko:hover{background:#22d3ee;}'
    + '#navbar .psn-burger{display:none;}'
    + '#navbar .psn-mobile{display:none;}'
    // Fallback styles for the injected Eko7 modal (pages that do not ship their own copy).
    + '#eko7-modal{position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:50;}'
    + '#eko7-modal.hidden{display:none;}'
    + '#eko7-modal>.psn-eko-box{background:#111827;width:100%;max-width:32rem;margin:0 1rem;border-radius:1.5rem;overflow:hidden;border:1px solid #22d3ee;color:#fff;}'
    + '#eko7-modal .psn-eko-head{background:linear-gradient(90deg,#9333ea,#06b6d4);padding:1rem 1.5rem;display:flex;align-items:center;}'
    + '#eko7-modal .psn-eko-head .psn-emoji{font-size:1.875rem;margin-right:.75rem;}'
    + '#eko7-modal .psn-eko-head .psn-title{flex:1;}'
    + '#eko7-modal .psn-eko-head h3{margin:0;font-weight:700;}'
    + '#eko7-modal .psn-eko-head p{margin:0;color:#a5f3fc;font-size:.875rem;}'
    + '#eko7-modal .psn-eko-close{background:none;border:none;color:#fff;font-size:1.875rem;line-height:1;cursor:pointer;}'
    + '#eko7-messages{height:24rem;padding:1rem;overflow-y:auto;background:#030712;display:flex;flex-direction:column;gap:.75rem;}'
    + '#eko7-modal .psn-eko-foot{padding:1rem;border-top:1px solid #374151;display:flex;gap:.5rem;}'
    + '#eko7-input{flex:1;background:#1f2937;color:#fff;border:none;border-radius:1rem;padding:.75rem 1.25rem;outline:none;}'
    + '#eko7-modal .psn-eko-send{background:#06b6d4;color:#fff;border:none;padding:0 2rem;border-radius:1rem;font-weight:500;cursor:pointer;}'
    + '#eko7-modal .psn-eko-send:hover{background:#22d3ee;}';

  var EKO_MODAL = ''
    + '<div id="eko7-modal" class="hidden">'
    + '  <div class="psn-eko-box">'
    + '    <div class="psn-eko-head">'
    + '      <span class="psn-emoji">🪐</span>'
    + '      <div class="psn-title"><h3>Eko7 · Live Transmission</h3><p>Cosmic Guide · Always listening</p></div>'
    + '      <button type="button" onclick="closeEko7Chat()" class="psn-eko-close">×</button>'
    + '    </div>'
    + '    <div id="eko7-messages"></div>'
    + '    <div class="psn-eko-foot">'
    + '      <input id="eko7-input" type="text" placeholder="Send a signal to Eko7..." />'
    + '      <button type="button" onclick="sendToEko7()" class="psn-eko-send">Send</button>'
    + '    </div>'
    + '  </div>'
    + '</div>';

  function linkAttrs(link) {
    var cls = [];
    if (link.file === current) cls.push('psn-active');
    if (link.featured) cls.push('psn-featured');
    var href = ROOT + link.file;
    return { href: href, cls: cls.length ? ' class="' + cls.join(' ') + '"' : '' };
  }

  function buildNav() {
    var desktop = '';
    var mobile = '';
    LINKS.forEach(function (link) {
      var a = linkAttrs(link);
      desktop += '<a href="' + a.href + '"' + a.cls + '>' + link.label + '</a>';
      mobile += '<a href="' + a.href + '" onclick="psnToggleMobileMenu()"' + a.cls + '>' + link.label + '</a>';
    });

    var contactHref = onIndex ? '#contact' : ROOT + 'index.html#contact';
    desktop += '<a href="' + contactHref + '">Contact</a>';
    mobile += '<a href="' + contactHref + '" onclick="psnToggleMobileMenu()">Contact</a>';

    desktop += '<button type="button" onclick="openEko7Chat()" class="psn-eko">Chat with Eko7</button>';
    mobile += '<button type="button" onclick="openEko7Chat(); psnToggleMobileMenu();" class="psn-eko">Chat with Eko7</button>';

    return '<nav id="navbar" class="psn-nav">'
      + '  <div class="psn-inner">'
      + '    <a href="' + ROOT + 'index.html" class="psn-brand">'
      + '      <img src="' + ROOT + 'assets/profile-dark-800.png" alt="" />'
      + '      <span>Psykter\'s Space</span>'
      + '    </a>'
      + '    <div class="psn-links">' + desktop + '</div>'
      + '    <button type="button" onclick="psnToggleMobileMenu()" class="psn-burger" aria-label="Menu">☰</button>'
      + '  </div>'
      + '  <div id="mobile-menu" class="psn-mobile">'
      + '    <div class="psn-m-inner">' + mobile + '</div>'
      + '  </div>'
      + '</nav>';
  }

  // Mobile menu toggle (namespaced so stale per-page toggleMobileMenu
  // definitions cannot override it).
  window.psnToggleMobileMenu = function () {
    var menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('psn-open');
  };

  // Ensure the Eko7 chat exists on pages that do not ship it:
  // inject the modal markup and lazy-load the shared chat script.
  function ensureEko7() {
    if (!document.getElementById('eko7-modal')) {
      document.body.insertAdjacentHTML('beforeend', EKO_MODAL);
      var input = document.getElementById('eko7-input');
      if (input) {
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && typeof window.sendToEko7 === 'function') window.sendToEko7();
        });
      }
    }
    if (typeof window.openEko7Chat === 'function') return;
    var s = document.createElement('script');
    s.src = ROOT + 'js/eko7-chat.js';
    document.body.appendChild(s);
  }

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('afterbegin', buildNav());
  // Wait for the DOM so page-provided Eko7 markup/scripts are detected first.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureEko7);
  } else {
    ensureEko7();
  }
})();
