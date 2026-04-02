document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll
  const navbar = document.querySelector('.navbar');
  const scrollBtn = document.querySelector('.scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    if (scrollBtn) {
      scrollBtn.classList.toggle('show', window.scrollY > 400);
    }
  });

  scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mob-close');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  const closeMob = () => {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  };

  mobileClose?.addEventListener('click', closeMob);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

  // Active nav link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Fade up on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fi').forEach(el => io.observe(el));

  // Counter animation
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = target / 55;
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = Math.floor(cur) + suffix;
      }, 22);
      co.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-target]').forEach(el => co.observe(el));

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Nachricht gesendet!';
      btn.style.background = '#16a34a';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  // Reference filter
  const filterBtns = document.querySelectorAll('.filt-btn');
  const refCards = document.querySelectorAll('.ref-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      refCards.forEach(card => {
        card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
      });
    });
  });

});
