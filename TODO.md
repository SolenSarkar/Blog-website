# Fix Home Page Pathname Detection

## Problem
Hero title cycle and search post behavior differ between:
- `https://solensarkar.github.io/Blog-website/` (pathname: `/Blog-website/`)
- `https://solensarkar.github.io/Blog-website/index.html` (pathname: `/Blog-website/index.html`)

## Root Cause
`isHomePage` checks in `script.js` use:
```js
window.location.pathname.includes('index.html') || window.location.pathname === '/'
```
This fails for `/Blog-website/` because it doesn't include `index.html` and is not exactly `/`.

## Steps
- [x] Read and understand `script.js` and `index.html`
- [x] Update `isHomePage` logic in `script.js` to handle trailing `/` and `/index.html`
- [x] Verify all three occurrences are fixed (DOMContentLoaded, filterPosts, initHeroTitleCycle)
- [x] Test locally or review code for correctness

