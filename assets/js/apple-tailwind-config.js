tailwind.config = {
    darkMode: "class", // ou "media"
    theme: {
        extend: {
            colors: {
                "apple-red": "#ff3b30", // Vermelho vibrante padrão Apple
                "apple-red-dark": "#d70015",
                "apple-blue": "#007aff",
                "apple-green": "#34c759",
                "apple-orange": "#ff9500",
                "background-light": "#f5f5f7", // Cinza bem claro característico
                "background-dark": "#000000",
                "surface-light": "#ffffff",
                "surface-dark": "#1c1c1e",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["Inter", "sans-serif"]
            },
            boxShadow: {
                // Sombras ultra-difusas para flutuação do vidro
                "apple-soft": "0 8px 30px rgba(0,0,0,0.04)",
                "apple-float": "0 20px 40px -10px rgba(0,0,0,0.08)",
                "apple-hover": "0 30px 60px -12px rgba(0,0,0,0.12)",
                "apple-dark": "0 20px 40px rgba(0,0,0,0.4)",
            },
            letterSpacing: {
                "tightest": "-.04em",
                "apple": "-.02em", // Tracking padrão para leitura
            },
            transitionTimingFunction: {
                "apple-spring": "cubic-bezier(0.25, 0.1, 0.25, 1)", // Spring feel
            },
            transitionDuration: {
                "400": "400ms", // Animações um pouco mais longas e fluidas
            }
        },
    },
}
