/* ============================================
   theme_toggle.js – Dark/Light Theme Toggle
   ============================================ */

(function() {
    const THEME_KEY = 'jnv-captain-theme';
    const body = document.body;

    // Create and inject toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.className = 'theme-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Toggle theme');
    toggleBtn.innerHTML = '<span class="theme-icon">🌙</span>'; // default dark icon
    document.body.appendChild(toggleBtn);

    // Apply saved theme on load
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            toggleBtn.querySelector('.theme-icon').textContent = '☀️'; // sun for light mode
        } else {
            body.classList.remove('light-theme');
            toggleBtn.querySelector('.theme-icon').textContent = '🌙'; // moon for dark mode
        }
    }

    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark'; // default dark
    applyTheme(savedTheme);

    // Toggle on click
    toggleBtn.addEventListener('click', () => {
        const isLight = body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);

        console.log('🎨 Theme switched to:', newTheme);
    });

    // Optional: listen for system preference changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) { // no user preference set
            applyTheme(e.matches ? 'light' : 'dark');
        }
    });
})();

/* Add button styles directly via JS or a separate CSS; we'll include them in theme_toggle.css for cleanliness.
   But here we add dynamically for completeness, though better in CSS file. We'll place the CSS for the button in theme_toggle.css.
*/