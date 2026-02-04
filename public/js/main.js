/**
 * Trauma Care Saalfelden - Main JavaScript
  */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initContactForm();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuBtn.classList.remove('active');
    }
  });
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Wird gesendet...';

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    submitBtn.innerHTML = '✓ Nachricht gesendet!';
    submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';

    // Reset form
    form.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
    }, 3000);
  });
}

/**
 * Parallax effect for hero blobs (optional enhancement)
 */
function initParallax() {
  const blobs = document.querySelectorAll('.hero-blob');

  if (!blobs.length) return;

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (clientX - centerX) / 50;
    const moveY = (clientY - centerY) / 50;

    blobs.forEach((blob, index) => {
      const factor = (index + 1) * 0.5;
      blob.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
  });
}

// Initialize parallax if user prefers reduced motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  initParallax();
}
