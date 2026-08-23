// Mukesh Kumar — Portfolio | shared script

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Mark active nav link
  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Scroll progress bar
  var bar = document.querySelector('.scroll-progress-bar');
  if (bar) {
    var updateBar = function () {
      var h = document.documentElement;
      var scrollable = h.scrollHeight - h.clientHeight;
      var pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  // Typing effect (hero)
  var typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    var phrases = ['Android apps.', 'React Native apps.', 'PHP/MySQL backends.', 'things that ship.'];
    var pi = 0, ci = 0, deleting = false;
    var tick = function () {
      var phrase = phrases[pi];
      if (!deleting) {
        ci++;
        typedEl.textContent = phrase.slice(0, ci);
        if (ci === phrase.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        ci--;
        typedEl.textContent = phrase.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    };
    tick();
  }

  // Code-panel typing cursor is CSS-only (blink animation) — no JS needed.

  // 3D tilt on hero visual (photo + code panel)
  var visual = document.querySelector('.hero-visual');
  if (visual && window.matchMedia('(hover: hover)').matches) {
    var codePanel = visual.querySelector('.code-panel');
    var photoFrame = visual.querySelector('.photo-frame');
    visual.addEventListener('mousemove', function (e) {
      var rect = visual.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      if (codePanel) codePanel.style.transform = 'rotate(-5deg) rotateX(' + (y * -10) + 'deg) rotateY(' + (x * 12) + 'deg)';
      if (photoFrame) photoFrame.style.transform = 'rotate(4deg) rotateX(' + (y * -8) + 'deg) rotateY(' + (x * 9) + 'deg) translateZ(20px)';
    });
    visual.addEventListener('mouseleave', function () {
      if (codePanel) codePanel.style.transform = 'rotate(-5deg)';
      if (photoFrame) photoFrame.style.transform = 'rotate(4deg)';
    });
  }

  // 3D tilt on project cards
  var tiltCards = document.querySelectorAll('.proj-card');
  if (tiltCards.length && window.matchMedia('(hover: hover)').matches) {
    tiltCards.forEach(function (card) {
      card.style.transformStyle = 'preserve-3d';
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(900px) rotateX(' + (y * -5) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = '2026';

  // Back to top
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
