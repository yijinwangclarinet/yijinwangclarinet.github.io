// Shared mobile navigation for every page.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 15);
}, { passive: true });

// Subtle content reveal; disabled automatically for reduced-motion users.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Open gallery photographs at their natural proportions in a simple lightbox.
const galleryLightbox = document.querySelector('#gallery-lightbox');
if (galleryLightbox) {
  const lightboxImage = galleryLightbox.querySelector('img');
  const closeLightboxButton = galleryLightbox.querySelector('.gallery-lightbox-close');

  document.querySelectorAll('.gallery-photo-button').forEach((button) => {
    button.addEventListener('click', () => {
      const thumbnail = button.querySelector('img');
      lightboxImage.src = button.dataset.full;
      lightboxImage.alt = thumbnail.alt;
      galleryLightbox.showModal();
    });
  });

  closeLightboxButton.addEventListener('click', () => galleryLightbox.close());
  galleryLightbox.addEventListener('click', (event) => {
    if (event.target === galleryLightbox) galleryLightbox.close();
  });
  galleryLightbox.addEventListener('close', () => {
    lightboxImage.src = '';
    lightboxImage.alt = '';
  });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.querySelector('.form-status').textContent = 'This form is not connected yet. Please email yijinwangclarinet@gmail.com.';
  });
}
