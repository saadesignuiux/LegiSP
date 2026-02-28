/**
 * Header Scroll — Liquid Glass Dark
 * Aplica efeito de fundo preto com liquid glass ao header ao scrollar.
 * Simplesmente inclua esse script e adicione id="main-header" no <header>.
 */
(function () {
    function initHeaderScroll() {
        const header = document.getElementById('main-header');
        if (!header) return;

        // Garante transição suave
        header.style.transition = 'background 350ms cubic-bezier(0.2,0,0,1), border-color 350ms, backdrop-filter 350ms, box-shadow 350ms';

        function update() {
            const scrolled = window.scrollY > 40;
            if (scrolled) {
                // Branco com liquid glass mais translúcido (70%)
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.70)';
                header.style.backdropFilter = 'blur(24px) saturate(180%)';
                header.style.webkitBackdropFilter = 'blur(24px) saturate(180%)';
                header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';

                // Textos escuros para contrastar com o fundo branco
                header.querySelectorAll('.header-nav-link').forEach(el => {
                    el.style.color = '#334155'; // slate-700
                    el.style.textShadow = 'none';
                });

                const brandName = header.querySelector('.header-brand-name');
                if (brandName) {
                    brandName.style.color = '#0f172a'; // slate-900
                    brandName.style.textShadow = 'none';
                }
            } else {
                header.style.backgroundColor = '';
                header.style.backdropFilter = '';
                header.style.webkitBackdropFilter = '';
                header.style.borderBottom = '';
                header.style.boxShadow = '';

                header.querySelectorAll('.header-nav-link').forEach(el => {
                    el.style.color = '';
                    el.style.textShadow = '';
                });

                const brandName = header.querySelector('.header-brand-name');
                if (brandName) {
                    brandName.style.color = '';
                    brandName.style.textShadow = '';
                }
            }
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderScroll);
    } else {
        initHeaderScroll();
    }
})();
