// assets/js/main.js
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    primaryNav.style.display = expanded ? '' : 'block';
  });

  // smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (window.innerWidth < 720 && primaryNav.style.display === 'block') {
          primaryNav.style.display = '';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // contact form validation + mailto fallback
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in name, email and a short message.');
      return;
    }

    // Build mailto link with form data (this avoids backend)
    const recipient = 'hello@viralbuzzmedia.com';
    const subject = encodeURIComponent(`Website Inquiry — ${name}${company ? ' @ ' + company : ''}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`);
    const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // open default mail client
    window.location.href = mailto;

    // Optionally, show small success message or clear form:
    // contactForm.reset();
  });

  // copy email button
  const copyEmailBtn = document.getElementById('copyEmail');
  copyEmailBtn.addEventListener('click', async function () {
    const email = 'hello@viralbuzzmedia.com';
    try {
      await navigator.clipboard.writeText(email);
      this.textContent = 'Copied ✓';
      setTimeout(() => this.textContent = 'Copy email', 2200);
    } catch (err) {
      alert('Copy failed — please copy the email manually: ' + email);
    }
  });
});
