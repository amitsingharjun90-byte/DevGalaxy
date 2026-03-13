// Dev Galaxy Dynamic JS
document.addEventListener('DOMContentLoaded', () => {
  // Starfield Canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'stars-canvas';
  canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random()
    });
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height) star.y = 0;
    });
    requestAnimationFrame(animateStars);
  }
  animateStars();

  // Resize canvas
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Mouse Parallax
  const parallaxEls = document.querySelectorAll('.parallax');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    parallaxEls.forEach(el => {
      el.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    });
  });

  // Scroll Reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Contact Form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate send
      alert('Message sent to the galaxy! 🚀');
      form.reset();
    });
  }

  // Navbar Mobile Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('active');
    });
  }
  // Close mobile menu when clicking link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('active');
    });
  });
});
