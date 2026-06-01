const cards = document.querySelectorAll('.work-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = [...cards].indexOf(entry.target) * 100;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

cards.forEach((card) => {
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s, border-color 0.35s';
  observer.observe(card);
});
