/* ══════════════════════════════════════════════════════════════════════════
   TwinVal — Interaction Layer
   Sovereign-institutional restraint: no parallax, no scroll-jacking.
   Three concerns only:
     1. Nav background state on scroll
     2. Intersection-observer reveals with stagger
     3. Contact form submission to Formspree
   ══════════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Current year in footer ───────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Nav background on scroll ─────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const NAV_THRESHOLD = 60;
  let navScrolled = false;

  function updateNavState() {
    const shouldBeScrolled = window.scrollY > NAV_THRESHOLD;
    if (shouldBeScrolled !== navScrolled) {
      navScrolled = shouldBeScrolled;
      nav.classList.toggle('is-scrolled', navScrolled);
    }
  }
  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  // ── Scroll reveal with stagger ──────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealOpts = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.08 };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('is-visible'), delay);
      observer.unobserve(el);
    });
  }, revealOpts);

  revealEls.forEach((el) => revealObserver.observe(el));

  // ── Hero initial reveal (no intersection trigger needed — visible at load)
  // The intersection observer handles this too, but we ensure it fires promptly
  // by kicking off visibility for elements in the viewport on first paint.
  requestAnimationFrame(() => {
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('is-visible'), delay);
      }
    });
  });

  // ── Contact form → Formspree ────────────────────────────────────────────
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.textContent = 'Sending…';
      status.className = 'form__status';

      const formData = new FormData(form);
      const action = form.getAttribute('action');

      // Formspree placeholder guard
      if (!action || action.includes('YOUR_FORMSPREE_ID')) {
        status.textContent = 'Form endpoint not configured. Please email us directly.';
        status.classList.add('is-error');
        return;
      }

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
          form.reset();
          status.textContent = 'Thank you. We will respond within one working day.';
          status.classList.add('is-success');
        } else {
          const data = await response.json().catch(() => ({}));
          const msg = (data.errors && data.errors.map(e => e.message).join(', ')) || 'Submission failed. Please try again.';
          status.textContent = msg;
          status.classList.add('is-error');
        }
      } catch (err) {
        status.textContent = 'Network error. Please try again or email directly.';
        status.classList.add('is-error');
      }
    });
  }

  // ── Close mobile nav on link click (if we later add a menu toggle) ───────
  document.querySelectorAll('.nav__links a').forEach((link) => {
    link.addEventListener('click', () => {
      // Placeholder for future mobile menu behaviour
    });
  });

  // ── Dashboard "Register interest" tiles ─────────────────────────────────
  // When a pending dashboard tile is clicked, seed the contact form with the
  // persona so the submission lands in Formspree pre-segmented, and prefill
  // the message textarea if the user hasn't started typing.
  const interestField = document.getElementById('f-interest');
  const messageField = document.getElementById('f-msg');
  const nameField = document.getElementById('f-name');

  document.querySelectorAll('[data-interest]').forEach((tile) => {
    tile.addEventListener('click', () => {
      const persona = tile.getAttribute('data-interest') || '';
      if (!persona) return;

      if (interestField) interestField.value = persona;
      if (messageField && !messageField.value.trim()) {
        messageField.value =
          `I'd like to register interest in the ${persona} dashboard. Please keep me informed as it becomes available.`;
      }
      // Focus the name field after the browser finishes the hash-scroll
      setTimeout(() => { if (nameField) nameField.focus({ preventScroll: true }); }, 600);
    });
  });

  // ── Demo terminal: cycling "verified" timestamp ──────────────────────────
  // Counts seconds upward between simulated block commits (13s cycle),
  // resetting to "just now" on each new commit. Gives the panel a live
  // pulse without being gimmicky. Respects reduced-motion preference.
  const verifiedEl = document.getElementById('verifiedTs');
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (verifiedEl && !prefersReducedMotion) {
    const CYCLE_SECONDS = 13;
    let secs = 0;
    setInterval(() => {
      secs = (secs + 1) % CYCLE_SECONDS;
      verifiedEl.textContent = secs === 0 ? 'just now' : `${secs}s ago`;
    }, 1000);
  }

})();
