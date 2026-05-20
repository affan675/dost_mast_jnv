/* ============================================
   PRELOADER – BOOT SEQUENCE WITH READABLE PAUSE
   ============================================ */
(function() {
    const preloader = document.getElementById('jnv-preloader');
    if (!preloader) return;

    // CSS animation timing summary:
    // - Last boot-line (cursor) finished at: 2.9s delay + 0.4s duration = 3.3s
    // - Access granted appears at 3.7s delay + 0.5s duration = 4.2s (fully visible)
    // We add a 2-second reading pause AFTER everything is readable.
    const allTextVisibleTime = 4200;        // ms (4.2 seconds)
    const readingPause = 2000;              // 2 seconds to read
    const fadeOutDuration = 600;            // matches CSS transition

    const totalTimeBeforeFade = allTextVisibleTime + readingPause; // 6200 ms

    setTimeout(() => {
        preloader.classList.add('fade-out');
        // Remove from DOM after transition
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
            console.log('💻 Laptop booted. Illegal access granted. Welcome to JNV Badmash.');
        }, fadeOutDuration + 100); // slightly after CSS transition ends
    }, totalTimeBeforeFade);
})();