// Current WOW Enhanced Script - Backup before basic revert
// WOW Enhanced Script - Preserves Mode Toggle + Typewriter, Reveals, Tilt, Particles
// Theme Toggle (PRESERVED)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme -icon');
const body  = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark');
    themeIcon.textContent = '☀️';
} else {
    themeIcon.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
        initParticles(true); // Dark particles
    } else {
        themeIcon.textContent = ' 🌙';
        localStorage.setItem('theme', 'light');
        initParticles(false); // Light particles
    }
});

// Active Nav Link (PRESERVED)
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // WOW: Init all enhancements
     initTypewriter();
    initScrollReveals();
    initCardTilt();
    initParticles(body.classList.contains('dark'));
});

 // Form Submission (PRESERVED)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank  you for your message! (Demo - form not connected to backend)');
        contactForm.reset();
    });
}

// Smooth Scrolling (PRESERVED)
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target =  document .querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// WOW 1: Hero Typewriter Effect
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroTitle) return;

    const titles = [
        heroTitle.textContent,
        'Welcome to the Future of Blogging ✨',
        'Tech, Design & Inspiration 🚀',
        heroTitle.textContent
    ];
    let i = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isDark = body.classList.contains('dark');

    function typeWriter() {
        const currentTitle = titles[i % titles.length];
        if (isDeleting)  {
            heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        const typeSpeed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, typeSpeed);
        
        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => { isDeleting = true; }, 1500);
        } else if (isDeleting &&  charIndex === 0) {
            isDeleting = false;
            i++;
            setTimeout(() => { isDark = body.classList.contains('dark'); }, 500);
        }
    }
    typeWriter();
}

// WOW 2: Scroll Reveals with IntersectionObserver 
function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
}

// WOW 3: 3D Card Tilt on Mousemove
function initCardTilt() {
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `
                translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// WOW 4: Canvas Particles
function initParticles(isDark) {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style .cssText = 'position: fixed; top: 0; left: 0; z-index: 1; pointer-events: none;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height =  window.innerHeight;
    });

    let particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random()  * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
             this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = isDark ? '#00 ff88' : 'rgba(255,255,255,0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw();  });
        requestAnimationFrame(animateParticles);
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    animateParticles();
}

