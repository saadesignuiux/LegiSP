document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.js-count-up');

    const animate = (counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2500; // 2.5 seconds for elegant delay
        let startTime = null;

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // Easing Out Quart function for smooth elegant deceleration
            const easeOutQuart = 1 - Math.pow(1 - Math.min(progress / duration, 1), 4);
            const currentCount = Math.floor(target * easeOutQuart);

            counter.innerText = currentCount + suffix;

            if (progress < duration) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + suffix; // Guarantee final state
            }
        };

        requestAnimationFrame(updateCount);
    }

    // Trigger animation when the cards come into viewport
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                obs.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1, // Trigger earlier
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
