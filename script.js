// Enhanced Blog JS - Fixed search: dynamic posts, title+excerpt search
// Theme Toggle (unchanged)
const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcons = document.querySelectorAll('.theme-icon .theme-sun, .theme-icon .theme-moon');
const body = document.body;

if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  body.classList.add('dark');
  document.querySelector('.theme-moon').style.display = 'none';
  document.querySelector('.theme-sun').style.display = 'inline';
} else {
  document.querySelector('.theme-moon').style.display = 'inline';
  document.querySelector('.theme-sun').style.display = 'none';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    document.querySelector('.theme-moon').style.display = 'none';
    document.querySelector('.theme-sun').style.display = 'inline';
    localStorage.setItem('theme', 'dark');
  } else {
    document.querySelector('.theme-moon').style.display = 'inline';
    document.querySelector('.theme-sun').style.display = 'none';
    localStorage.setItem('theme', 'light');
  }
});

// Active Nav Link (unchanged)
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});

// Form Submission (unchanged)
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! (Demo)');
    contactForm.reset();
  });
}

// Smooth Scrolling (unchanged)
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ========== NEW: Posts Data & Dynamic Search ==========
// All posts data (title, excerpt, date, image, url) - extracted from all post*.html
const postsData = [
  {
    title: 'The Future of Web Development',
    excerpt: 'Exploring modern frameworks and best practices like React, Vue, serverless...',
    date: 'October 10, 2024',
    image: 'images/web-future.jpg',
    url: 'post1.html'
  },
  {
    title: 'CSS Grid Mastery',
    excerpt: 'Advanced layouts with CSS Grid and Flexbox, grid-template-areas, subgrid...',
    date: 'September 25, 2024',
    image: 'images/web-future.jpg',
    url: 'post2.html'
  },
  {
    title: 'Responsive Typography',
    excerpt: 'Creating scalable type systems with modern CSS techniques...',
    date: 'September 15, 2024',
    image: 'images/typography.jpg',
    url: 'post3.html'
  },
  {
    title: 'JavaScript ES2025 Features',
    excerpt: 'New syntax like pipeline operator, improved modules, error handling...',
    date: 'November 1, 2024',
    image: 'images/web-future.jpg',
    url: 'post4.html'
  },
  {
    title: 'Modern CSS Animations',
    excerpt: '@property, scroll-driven animations, and advanced techniques...',
    date: 'October 25, 2024',
    image: 'images/typography.jpg',
    url: 'post5.html'
  },
  {
    title: 'Building Progressive Web Apps',
    excerpt: 'Service Workers, Manifests, and offline-first strategies...',
    date: 'October 15, 2024',
    image: 'images/typography.jpg',
    url: 'post6.html'
  }
];

// Render posts to container
function renderPosts(posts, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = posts.map(post => `
    <article class="post-card">
      <img src="${post.image}" alt="${post.title}" class="post-image">
      <div class="post-content">
        <h4><a href="${post.url}">${post.title}</a></h4>
        <p class="post-meta">${post.date} | 5-9 min read</p>
        <p>${post.excerpt}</p>
        <a href="${post.url}" class="btn">READ MORE</a>
      </div>
    </article>
  `).join('');
}

// Enhanced filter: search title + excerpt across ALL posts, re-render
function filterPosts(e) {
  const query = e.target.value.toLowerCase().trim();
  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('/') || path.endsWith('/index.html');

  const filtered = query
    ? postsData.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      )
    : (isHomePage ? postsData.slice(0, 3) : postsData);
  
  renderPosts(filtered, '.post-list');
  
  const noResults = document.getElementById('no-results');
  const postList = document.querySelector('.post-list');
  if (filtered.length === 0 && query) {
    noResults.style.display = 'block';
    postList.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    postList.style.display = 'block';
  }
}


// Animation inits
function initHeroTitleCycle() {
  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('/') || path.endsWith('/index.html');
  if (!isHomePage) return;

  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  // Add cycling class for fixed height
  heroTitle.classList.add('cycling-title');

  // Cycle titles (including original)
  const originalText = heroTitle.textContent.trim();
  const cycleTitles = [
    originalText,
    'Welcome to the Future of Blogging ✨',
    'Tech, Design & Inspiration 🚀',
    originalText
  ];

  let currentIndex = 0;

  function cycleNext() {
    // Fade out
    heroTitle.classList.add('fade-out');

    setTimeout(() => {
      // Swap to next title (instant, hidden by fade)
      currentIndex = (currentIndex + 1) % cycleTitles.length;
      heroTitle.textContent = cycleTitles[currentIndex];

      // Fade in
      heroTitle.classList.remove('fade-out');
    }, 400); // Match CSS transition duration
  }

  // Start cycling every 5 seconds
  setInterval(cycleNext, 5000);

  // Initial cycle after 2s
  setTimeout(cycleNext, 2000);
}

function initScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  // Add data-reveal to key sections
  document.querySelectorAll('.posts, .about-content, .skills-grid, .hero').forEach(el => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });
  document.querySelectorAll('.post-card, .topic-card').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });
  // Observe elements that already have data-reveal in the markup (e.g. contact-info)
  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}


function initCardTilt() {
  const cards = document.querySelectorAll('.post-card, .topic-card');
  cards.forEach(card => {
    let isTilting = false;
    card.addEventListener('mousemove', (e) => {
      if (isTilting) return;
      isTilting = true;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      setTimeout(() => { isTilting = false; }, 16);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
    // Touch support for mobile
    card.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
  });
}



function initTypewriter() {
  const logoTitle = document.querySelector('.logo h1 .logo-title');
  if (!logoTitle || logoTitle.textContent.trim() !== '') return;

  const fullText = 'MyBlog';
  const speed = 80; // ms per char
  let i = 0;

  logoTitle.textContent = '';
  logoTitle.classList.add('typing-cursor');

  function type() {
    if (i < fullText.length) {
      logoTitle.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      logoTitle.classList.remove('typing-cursor');
    }
  }
  type();
}

// Theme toggle cleaned - particles removed


// Scroll-based navbar color change
function initNavbarScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Check on page load
}

// Init search on pages with it - conditional rendering for home (top 3) vs all posts + ANIMATIONS
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const path = window.location.pathname;
    const isHomePage = path === '/' || path.endsWith('/') || path.endsWith('/index.html');
    const initialPosts = isHomePage ? postsData.slice(0, 3) : postsData;
    
    searchInput.addEventListener('input', filterPosts);
    // Initial render
    renderPosts(initialPosts, '.post-list');
  }
  
  // WOW: Init animations
  setTimeout(() => {
    initHeroTitleCycle();
    initScrollReveals();
    initCardTilt();
    // initParticles(); // Removed floating particles
    initTypewriter();
    initNavbarScroll();
  }, 100);
});



