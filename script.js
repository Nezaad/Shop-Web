gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  gsap.to('.progress span', { width: '100%', ease: 'none', scrollTrigger: { scrub: 0.2 } });

  gsap.from('.hero-copy > *', {
    y: 35, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15
  });
  gsap.from('.hero-image-wrap img', {
    scale: 1.18, yPercent: 8, duration: 1.5, ease: 'power3.out', delay: 0.1
  });
  gsap.to('.hero-image-wrap img', {
    yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero-copy', {
    yPercent: -18, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.orbit-one', {
    rotation: 28, xPercent: 16, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  document.querySelectorAll('.statement h2, .section-heading h2, .closing h2').forEach((heading) => {
    gsap.from(heading, {
      y: 70, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: heading, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
  });

  gsap.from('.product-card', {
    y: 80, opacity: 0, duration: 1, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '.product-grid', start: 'top 78%', toggleActions: 'play none none reverse' }
  });
  gsap.to('.marquee-track', {
    xPercent: -28, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.from('.journal-item', {
    x: -35, opacity: 0, duration: .7, stagger: .1, ease: 'power2.out',
    scrollTrigger: { trigger: '.journal-list', start: 'top 80%', toggleActions: 'play none none reverse' }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  });
});

document.querySelector('form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.textContent = '✓';
  event.currentTarget.querySelector('input').value = '';
  event.currentTarget.querySelector('input').placeholder = 'You are on the list';
});

document.querySelectorAll('.product-image button').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = '✓';
    document.querySelector('.bag-button b').textContent = '1';
  });
});
