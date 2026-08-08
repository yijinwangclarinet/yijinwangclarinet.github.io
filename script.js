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
  const formStatus = contactForm.querySelector('.form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = 'Sending your message…';
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');

    try {
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      formStatus.textContent = 'Thank you. Your message has been sent successfully.';
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = 'Sorry, your message could not be sent. Please try again or email yijinwangclarinet@gmail.com.';
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  });
}
