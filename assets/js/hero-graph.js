/**
 * Hero Background Swarming & Lens Knowledge Graph
 * Renders gray particles that swarm the mouse, illuminated by a white spotlight.
 * The output is copied to a dual-canvas setup to achieve a sharp lens over a heavy blur.
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvasBg = document.getElementById('hero-graph-bg');
    const canvasLens = document.getElementById('hero-graph-lens');
    if (!canvasBg || !canvasLens) return;

    const ctxBg = canvasBg.getContext('2d');
    const ctxLens = canvasLens.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration
    const config = {
        particleCount: 160, // Dense for swarming
        maxVelocity: 0.15, // Extremely slow baseline
        minRadius: 1.5,
        maxRadius: 3.5,
        connectionDistance: 150,
        mouseRadius: 400, // Large radius to pull from 360 degrees afar
        baseColor: 'rgba(148, 163, 184, ', // Slate-400
    };

    let mouse = {
        x: -1000,
        y: -1000
    };

    function resizeCanvas() {
        const parent = canvasBg.parentElement;
        width = parent.offsetWidth;
        height = parent.offsetHeight;

        const dpr = window.devicePixelRatio || 1;

        canvasBg.width = width * dpr;
        canvasBg.height = height * dpr;
        ctxBg.scale(dpr, dpr);

        canvasLens.width = width * dpr;
        canvasLens.height = height * dpr;
        ctxLens.scale(dpr, dpr);

        initParticles();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.maxVelocity;
            this.vy = (Math.random() - 0.5) * config.maxVelocity;
            this.radius = Math.random() * (config.maxRadius - config.minRadius) + config.minRadius;
        }

        update() {
            // Swarm Attraction (360 degrees, very gentle)
            if (mouse.x > -900 && mouse.y > -900) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseRadius) {
                    // Pull gently towards mouse
                    const force = (config.mouseRadius - distance) / config.mouseRadius;
                    // Much gentler attraction (scale of 3-4 out of 10)
                    this.vx += (dx / distance) * force * 0.04;
                    this.vy += (dy / distance) * force * 0.04;

                    // Higher friction creates the "cloud" effect without erratic orbiting
                    this.vx *= 0.92;
                    this.vy *= 0.92;
                }
            } else {
                // Decay back to base velocity when mouse leaves
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > config.maxVelocity) {
                    this.vx *= 0.95;
                    this.vy *= 0.95;
                } else if (speed < config.maxVelocity * 0.3 && Math.random() < 0.02) {
                    // Randomly kickstart slow particles
                    this.vx += (Math.random() - 0.5) * 0.2;
                    this.vy += (Math.random() - 0.5) * 0.2;
                }
            }

            // Natural flow movement
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Safety bounds
            if (this.x < 0) this.x = 0;
            if (this.x > width) this.x = width;
            if (this.y < 0) this.y = 0;
            if (this.y > height) this.y = height;
        }
    }

    function initParticles() {
        particles = [];
        const area = width * height;
        const count = Math.min(config.particleCount, Math.floor(area / 8000));

        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        // Clear background canvas
        ctxBg.clearRect(0, 0, width, height);

        // 1. Draw the Background Spotlight (Holofote) FIRST
        if (mouse.x > -900 && mouse.y > -900) {
            const glow = ctxBg.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, config.mouseRadius);

            // Soft white glow that illuminates the gray nodes
            glow.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
            glow.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctxBg.fillStyle = glow;
            ctxBg.beginPath();
            ctxBg.arc(mouse.x, mouse.y, config.mouseRadius, 0, Math.PI * 2);
            ctxBg.fill();
        }

        // 2. Draw connections (Grey Webs) - Nearest Neighbor Strict
        for (let i = 0; i < particles.length; i++) {
            let nearestDist = config.connectionDistance;
            let nearestJ = -1;

            // Find the single closest particle to connect to
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < nearestDist) {
                    nearestDist = distance;
                    nearestJ = j;
                }
            }

            if (nearestJ !== -1) {
                const j = nearestJ;
                let opacity = 1 - (nearestDist / config.connectionDistance);
                ctxBg.strokeStyle = config.baseColor + (opacity * 0.25) + ')';
                ctxBg.lineWidth = 1.0;

                ctxBg.beginPath();
                ctxBg.moveTo(particles[i].x, particles[i].y);
                ctxBg.lineTo(particles[j].x, particles[j].y);
                ctxBg.stroke();
            }
        }

        // 3. Draw particles (Grey Dots) with Distance Fade
        for (let particle of particles) {
            particle.update();

            let particleOpacity = 0.2; // Base faint visibility

            if (mouse.x > -900 && mouse.y > -900) {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distMouse = Math.sqrt(dx * dx + dy * dy);

                // Fade and "blur" out as they distance from the mouse
                if (distMouse < config.mouseRadius) {
                    const mouseFactor = 1 - (distMouse / config.mouseRadius);
                    particleOpacity = 0.2 + (mouseFactor * 0.6); // Up to 0.8
                }
            } else {
                // Return to normal when mouse is out
                particleOpacity = 0.5;
            }

            ctxBg.beginPath();
            ctxBg.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctxBg.fillStyle = config.baseColor + particleOpacity + ')';
            ctxBg.fill();
        }

        // 3.5 Draw Red Mouse Cursor Node and its direct connections
        if (mouse.x > -900 && mouse.y > -900) {
            // Find only the 3 closest particles to the mouse to prevent overlap at the center
            let mouseConnections = [];
            for (let particle of particles) {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < config.connectionDistance) {
                    mouseConnections.push({ particle, distance });
                }
            }
            mouseConnections.sort((a, b) => a.distance - b.distance);
            mouseConnections = mouseConnections.slice(0, 3); // Max 3 connections

            for (let conn of mouseConnections) {
                const opacity = 1 - (conn.distance / config.connectionDistance);
                ctxBg.strokeStyle = config.baseColor + (opacity * 0.5) + ')';
                ctxBg.lineWidth = 1.0;

                ctxBg.beginPath();
                ctxBg.moveTo(mouse.x, mouse.y);
                ctxBg.lineTo(conn.particle.x, conn.particle.y);
                ctxBg.stroke();
            }

            // Outer glow for the red node
            ctxBg.beginPath();
            ctxBg.arc(mouse.x, mouse.y, config.maxRadius + 4, 0, Math.PI * 2);
            ctxBg.fillStyle = 'rgba(227, 6, 19, 0.3)';
            ctxBg.fill();

            // Core red node
            ctxBg.beginPath();
            ctxBg.arc(mouse.x, mouse.y, config.maxRadius + 1, 0, Math.PI * 2);
            ctxBg.fillStyle = '#e30613'; // accent-red
            ctxBg.fill();
        }

        // 4. Update the Sharp Lens Canvas (Foreground)
        ctxLens.clearRect(0, 0, width, height);
        // Draw the exact same image to the lens canvas (CSS handles the radial spotlight mask)
        ctxLens.drawImage(canvasBg, 0, 0, width, height);

        requestAnimationFrame(animate);
    }

    // Event Listeners
    window.addEventListener('resize', resizeCanvas);

    const heroSection = canvasBg.parentElement;
    const searchInput = document.getElementById('main-search-input');
    let isSearchActive = false;

    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            isSearchActive = true;
            // Instantly hide the mouse effect
            mouse.x = -1000;
            mouse.y = -1000;
            canvasLens.style.setProperty('--mx', `-1000px`);
            canvasLens.style.setProperty('--my', `-1000px`);
        });

        searchInput.addEventListener('blur', () => {
            isSearchActive = false;
        });
    }

    heroSection.addEventListener('mousemove', (e) => {
        if (isSearchActive) return;
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;

        // Update CSS variables for the radial mask
        canvasLens.style.setProperty('--mx', `${mouse.x}px`);
        canvasLens.style.setProperty('--my', `${mouse.y}px`);
    });

    heroSection.addEventListener('mouseleave', () => {
        if (isSearchActive) return;
        mouse.x = -1000;
        mouse.y = -1000;
        canvasLens.style.setProperty('--mx', `-1000px`);
        canvasLens.style.setProperty('--my', `-1000px`);
    });

    heroSection.addEventListener('touchmove', (e) => {
        if (isSearchActive) return;
        if (e.touches.length > 0) {
            const rect = heroSection.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;

            canvasLens.style.setProperty('--mx', `${mouse.x}px`);
            canvasLens.style.setProperty('--my', `${mouse.y}px`);
        }
    });

    heroSection.addEventListener('touchend', () => {
        mouse.x = -1000;
        mouse.y = -1000;
        canvasLens.style.setProperty('--mx', `-1000px`);
        canvasLens.style.setProperty('--my', `-1000px`);
    });

    resizeCanvas();
    animate();
});
