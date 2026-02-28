tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#000000",
                "accent-red": "#E30613",
                "background-light": "#FAFAFB",
                "background-dark": "#121212",
                "surface": "#F2F2F7",
                "neutral-soft": "#F4F4F4",
            },
            fontFamily: {
                "display": ["-apple-system", "BlinkMacSystemFont", '"San Francisco"', '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
                "law": ['"Atkinson Hyperlegible"', "sans-serif"],
                "sans": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "0.75rem",
                "xl": "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
                "full": "9999px"
            },
            boxShadow: {
                "md3": "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
                "md3-hover": "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 4px 8px 3px rgba(0, 0, 0, 0.1)",
                "md3-1": "0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
                "md3-2": "0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
                "md3-3": "0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
                "md3-4": "0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)",
                "md3-5": "0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)",
            },
            transitionTimingFunction: {
                "md3-standard": "cubic-bezier(0.2, 0, 0, 1)",
                "md3-emphasized": "cubic-bezier(0.2, 0, 0, 1)",
            },
            transitionDuration: {
                "200": "200ms",
                "300": "300ms",
                "400": "400ms"
            }
        },
    },
}

// Efeito Global: Liquid Glass Header ao scrollar
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header.md3-header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('md3-header-scrolled');
                // Remove o solid bg inicial
                header.classList.remove('bg-white', 'dark:bg-background-dark');
            } else {
                header.classList.remove('md3-header-scrolled');
                // Retorna o solid bg para não misturar com elementos que passam por baixo
                header.classList.add('bg-white', 'dark:bg-background-dark');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Trigger inicial
    }
});
