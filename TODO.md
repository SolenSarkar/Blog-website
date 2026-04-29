# TODO: Enable Lazy Loading

## Steps (Approved Plan - In Progress)

### 1. Create TODO.md [IN PROGRESS - CREATED]
- [x] Generate this file with step-by-step plan.

### 2. Edit HTML files to add \`loading="lazy"\` to all <img> tags
- [x] index.html: Replace \`<img src="images/profile.jpg" alt="Developer profile photo" class="profile-img">\` with \`<img src="images/profile.jpg" alt="Developer profile photo" class="profile-img" loading="lazy">\`
- [x] about.html: Replace \`<img src="images/profile.jpg" alt="Developer profile photo" class="profile-img">\` with \`<img src="images/profile.jpg" alt="Developer profile photo" class="profile-img" loading="lazy">\`
- [x] post1.html: Replace \`<img src="images/web-future.jpg" alt="Futuristic web development" class="post-hero-image">\` with \`<img src="images/web-future.jpg" alt="Futuristic web development" class="post-hero-image" loading="lazy">\`
- [x] post2.html: Replace \`<img src="images/web-future.jpg" alt="CSS Grid layouts" class="post-hero-image">\` with \`<img src="images/web-future.jpg" alt="CSS Grid layouts" class="post-hero-image" loading="lazy">\`
- [x] post3.html: Replace \`<img src="images/typography.jpg" alt="Typography scales" class="post-hero-image">\` with \`<img src="images/typography.jpg" alt="Typography scales" class="post-hero-image" loading="lazy">\`
- [x] post4.html: Replace \`<img src="images/web-future.jpg" alt="JavaScript ES2025 features" class="post-hero-image">\` with \`<img src="images/web-future.jpg" alt="JavaScript ES2025 features" class="post-hero-image" loading="lazy">\`
- [x] post5.html: Replace \`<img src="images/typography.jpg" alt="Modern CSS animations" class="post-hero-image">\` with \`<img src="images/typography.jpg" alt="Modern CSS animations" class="post-hero-image" loading="lazy">\`
- [x] post6.html: Replace \`<img src="images/typography.jpg" alt="PWA architecture" class="post-hero-image">\` with \`<img src="images/typography.jpg" alt="PWA architecture" class="post-hero-image" loading="lazy">\`

### 3. Test Changes
- [ ] Run local server: \`python -m http.server 8000\` or use Live Server.
- [ ] Open index.html/post*.html, check Network tab: images should load on scroll.
- [ ] Run Lighthouse audit for performance improvement.

### 4. Complete Task
- [ ] Update TODO.md with completions.
- [ ] Use attempt_completion.
