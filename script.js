

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Simple toggle style for demo
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    } else {
        navLinks.style.display = 'none';
    }
});

// Scroll Reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.feature-card, .gallery-item');
hiddenElements.forEach((el) => observer.observe(el));

// Add CSS class for animation in JS to keep it clean
const style = document.createElement('style');
style.innerHTML = `
    .feature-card, .gallery-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    .feature-card.show, .gallery-item.show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
