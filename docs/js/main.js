// Underwater_IQA GitHub Pages JavaScript

// Mobile Menu Toggle
function initMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  // Create hamburger menu for mobile
  const nav = document.querySelector('nav');
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '☰';
  hamburger.style.display = 'none';
  hamburger.style.cursor = 'pointer';
  hamburger.style.fontSize = '1.5rem';
  hamburger.style.color = 'white';

  nav.insertBefore(hamburger, navLinks);

  // Show hamburger on small screens
  function handleResize() {
    if (window.innerWidth <= 768) {
      hamburger.style.display = 'block';
      navLinks.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
    } else {
      hamburger.style.display = 'none';
      navLinks.style.display = 'flex';
    }
  }

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navLinks.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
  });

  window.addEventListener('resize', handleResize);
  handleResize();
}

// Gallery Lightbox
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length === 0) return;

  // Create lightbox HTML
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2000;
    justify-content: center;
    align-items: center;
  `;

  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  lightboxContent.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90%;
  `;

  const img = document.createElement('img');
  img.style.cssText = `
    width: 100%;
    height: auto;
    border-radius: 8px;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = `
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
  `;

  lightboxContent.appendChild(img);
  lightboxContent.appendChild(closeBtn);
  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);

  // Add click handlers
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      img.src = imgSrc;
      lightbox.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
    }
  });
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// Animate elements on scroll
function initScrollAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll('.feature-card, .gallery-item, .container').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Copy code to clipboard
function initCodeCopy() {
  document.querySelectorAll('pre').forEach((pre) => {
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '📋 Copy';
    copyBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 0.5rem 1rem;
      background: #00d4ff;
      color: #001a4d;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
    `;

    pre.style.position = 'relative';
    pre.appendChild(copyBtn);

    copyBtn.addEventListener('click', () => {
      const code = pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      });
    });
  });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGalleryLightbox();
  initSmoothScroll();
  initScrollAnimation();
  initCodeCopy();
});

// Responsive adjustments on resize
window.addEventListener('resize', () => {
  const navLinks = document.querySelector('.nav-links');
  if (window.innerWidth > 768 && navLinks) {
    navLinks.style.display = 'flex';
    navLinks.classList.remove('active');
  }
});
