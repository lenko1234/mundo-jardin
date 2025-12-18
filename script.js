// GSAP Scroll-Driven Horizontal Animation
gsap.registerPlugin(ScrollTrigger);

const setupScrollAnimations = () => {
    const rows = gsap.utils.toArray('.hz-row');

    rows.forEach((row, i) => {
        const isOdd = i % 2 === 0;
        const wrapper = row.querySelector('.hz-item-wrapper');

        // Posición inicial fuera de pantalla
        const startX = isOdd ? '-50%' : '50%';
        const endX = '0%';

        // Establecer posición inicial
        gsap.set(row, { x: startX });

        // Main Horizontal Movement - más rápido y temprano
        gsap.fromTo(row,
            { x: startX },
            {
                x: endX,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 0.8,
                }
            }
        );

        // Depth Effect (Scale & Opacity) - sincronizado
        gsap.fromTo(wrapper,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 0.8,
                }
            }
        );
    });
};

// Animación para la sección de ubicación
const setupLocationAnimation = () => {
    const locationSection = document.querySelector('.location-section');
    if (!locationSection) return;

    const title = locationSection.querySelector('.section-title');
    const mapContainer = locationSection.querySelector('.map-container');
    const ctaContainer = locationSection.querySelector('.cta-container');

    // Título con fade-in y parallax sutil
    gsap.fromTo(title,
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                end: "top 50%",
                scrub: 1,
            }
        }
    );

    // Mapa con fade-in y parallax
    gsap.fromTo(mapContainer,
        { y: 80, opacity: 0, scale: 0.95 },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: mapContainer,
                start: "top 80%",
                end: "top 40%",
                scrub: 1,
            }
        }
    );

    // Botón CTA con fade-in y parallax
    gsap.fromTo(ctaContainer,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ctaContainer,
                start: "top 85%",
                end: "top 55%",
                scrub: 1,
            }
        }
    );
};

// Esperar a que GSAP esté cargado
if (typeof gsap !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        setupScrollAnimations();
        setupLocationAnimation();
    });
} else {
    console.error('GSAP no está cargado');
}

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
