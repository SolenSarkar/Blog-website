# Performance Optimization TODO - Blog Website

**Goal:** Compress/resize images, enable lazy loading, remove unused CSS/JS.

## Current Progress: 2/11 steps complete


1. [x] Analyze project files/images/tools via read_file/search_files/execute_command
2. [x] Create detailed edit plan and get user approval

4. [ ] Compress/resize images: profile.jpg -> 300x300@80%, hero (typography/web-future) -> 1200x675@80%, create .webp + jpg
5. [ ] Update all img src in HTMLs to optimized versions (create/update loading="lazy" where missing)
6. [ ] Purge unused CSS rules with purgecss (scan all HTMLs)
7. [ ] Minify CSS with cssnano
8. [ ] Minify JS with terser
9. [ ] Apply minified CSS/JS to project, update HTML links if needed
10. [ ] Add perf opts: preconnect fonts, defer/async scripts
11. [ ] Test with Lighthouse, generate report, complete task

**Next:** Backup images.
