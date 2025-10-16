// Scroll navbar opacity on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if(window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll to section for buttons and navbar links
function scrollToSection(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Add smooth scroll for all navbar links
document.querySelectorAll('#navbar a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href').substring(1);
    scrollToSection(target);
  });
});
