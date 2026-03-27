/* ============================================================
   LUMIÈRE BEAUTY PARLOUR – JavaScript (UPDATED)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================
     1. NAVBAR – scroll sticky + hamburger menu
     ====================================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const fab = document.getElementById('fab-book');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    fab.classList.toggle('visible', y > 300);
    highlightActiveNav();
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  /* ======================================================
     2. ACTIVE NAV HIGHLIGHT
     ====================================================== */
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ======================================================
     3. HERO PARTICLES
     ====================================================== */
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 6 + 2;
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 10}s;
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ======================================================
     4. COUNTER ANIMATION
     ====================================================== */
  const counters = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    });
  }

  setTimeout(startCounters, 1200);

  /* ======================================================
     5. SCROLL REVEAL
     ====================================================== */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ======================================================
     6. TESTIMONIALS
     ====================================================== */
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.t-dot');
  const prevBtn = document.getElementById('t-prev');
  const nextBtn = document.getElementById('t-next');
  let current = 0;

  function showTestimonial(idx) {
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
  }

  function nextTestimonial() {
    showTestimonial((current + 1) % cards.length);
  }

  function prevTestimonial() {
    showTestimonial((current - 1 + cards.length) % cards.length);
  }

  nextBtn.addEventListener('click', nextTestimonial);
  prevBtn.addEventListener('click', prevTestimonial);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showTestimonial(i));
  });

  setInterval(nextTestimonial, 5000);

  /* ======================================================
     7. CONTACT FORM → BACKEND CONNECT 🔥
     ====================================================== */

  const form = document.getElementById('contact-form');
  const toast = document.getElementById('success-toast');

  const API = "https://your-backend.onrender.com"; // 🔥 CHANGE THIS

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    btn.textContent = '✦ Sending…';
    btn.disabled = true;

    const booking = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      service: document.getElementById('service').value,
      date: document.getElementById('date').value,
      message: document.getElementById('message').value,
    };

    try {
      await fetch(`${API}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      btn.textContent = '✦ Book My Appointment';
      btn.disabled = false;

      form.reset();
      showToast();

    } catch (err) {
      alert("Booking failed 😢");
      btn.textContent = '✦ Book My Appointment';
      btn.disabled = false;
    }
  });

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ======================================================
     8. NEWSLETTER
     ====================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      if (!input.value) return;

      btn.textContent = '✓';
      setTimeout(() => {
        btn.textContent = '✦';
        input.value = '';
      }, 3000);
    });
  }

});