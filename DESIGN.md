# Design System: Catálogo Inteligente de Normas SP (LegiSP)
**Project ID:** 14598152960519276509

## 1. Visual Theme & Atmosphere

O LegiSP adota uma estética **Editorial Governamental** — séria, legível e confiável, com toques de energia visual através do vermelho institucional. O layout é **airy** (generoso em espaço em branco) mas com hierarquia de informação densa e precisa. O tom visual evoca jornais de qualidade e portais institucionais modernos: tipografia bold em caixa alta, contraste extremo preto-e-branco, e o vermelho usado como acento de ação e urgência. O resultado é uma interface que comunica **autoridade sem burocracia**.

## 2. Color Palette & Roles

| Nome Descritivo | Hex | Papel Funcional |
|---|---|---|
| **Preto Absoluto** | `#000000` | Cor primária: backgrounds de CTAs, tags de tipo, logo |
| **Vermelho Institucional** | `#E30613` | Cor de acento: hover states, sublinhados de destaque, bordas de atividade recente, tags temáticas |
| **Branco Puro** | `#FFFFFF` | Background principal das páginas e cards |
| **Cinza Névoa** | `#F4F4F4` | Background de seções secundárias (hero search, inputs) |
| **Carvão Escuro** | `#191919` | Background do dark mode |
| **Cinza Ardósia** claro | `#e2e8f0` (slate-200) | Bordas de cards, divisores |
| **Cinza Ardósia** médio | `#94a3b8` (slate-400) | Textos de metadados, contadores, timestamps |

## 3. Typography Rules

- **Família principal:** Inter (Google Fonts) — sem serifas, geométrica, altamente legível
- **Display / Títulos principais:** `font-extrabold` (800), `tracking-tighter`, `uppercase` — cria impacto jornalístico
- **Section headers:** `font-black` (900), `italic`, `uppercase`, `tracking-tighter` — bordas inferiores de 4px
- **Body / Descrições:** `font-medium` (500) ou `font-semibold` (600), tamanho `sm` ou `base`
- **Microtextos / Labels:** `font-bold` ou `font-black`, `uppercase`, `tracking-widest`, tamanho `[10px]` ou `xs`
- **Links de ação:** `font-bold`, `hover:text-accent-red`, `transition-colors`

## 4. Component Stylings

- **Botão Primário:** Fundo Preto Absoluto, texto branco, `px-8 py-3`, cantos `rounded-lg` (levemente arredondados). No hover: fundo muda para Vermelho Institucional com `transition-colors`.
- **Botão Secundário / Outline:** Borda `border-2 border-primary`, fundo transparente, texto preto. No hover: `bg-primary text-white`. Estilo editorial/jornal.
- **Botão Pill (filtros/tags):** `rounded-full`, borda `border border-slate-300`, com ícone Material Symbol + texto. Compacto (`px-5 py-2`).
- **Cards de Norma:** Fundo branco, borda `border-2 border-slate-100`, cantos `rounded-xl`. No hover: borda muda para `border-accent-red` com `transition-all`. Padding interno `p-6`. Badge de tipo no topo esquerdo (Preto Absoluto, texto branco, caixa alta, `rounded`, tamanho `[10px]`).
- **Cards de Alteração Recente:** Borda esquerda `border-l-4 border-accent-red`, sem cantos arredondados, `p-4`. Sombra suave que intensifica no hover.
- **Cards de Curadoria:** Full-bleed com imagem de fundo (`opacity-60`), gradiente `from-black` sobreposto. Texto branco. Hover: imagem escala `scale-110` com `transition-transform duration-700`.
- **Tags de Categoria:** `text-[10px] font-black bg-primary text-white px-2 py-1 uppercase tracking-widest rounded` — rótulos compactos e de alto contraste.
- **Input de Busca:** `h-20`, `rounded-xl`, `border-2 border-slate-200`, sombra `shadow-xl shadow-black/5`. Focus: `border-primary`. Botão embutido à direita.
- **Header sticky:** `bg-white/80 backdrop-blur-md border-b border-slate-200` — glassmorphism sutil. Altura `h-20`.

## 5. Layout Principles

- **Grid principal:** `max-w-7xl mx-auto px-6` — conteúdo centralizado com padding lateral de 24px
- **Grid de cards:** `grid grid-cols-1 md:grid-cols-2 gap-6` para cards de normas; `grid-cols-3` para curadoria temática
- **Layout hero:** `pt-20 pb-24 text-center` — generoso espaço vertical, centralizado
- **Sidebar layout:** `grid grid-cols-1 lg:grid-cols-3` — conteúdo principal ocupa 2/3, sidebar 1/3
- **Espaçamento de seção:** `py-16` ou `py-20` entre seções grandes
- **Ícones:** Material Symbols Outlined, integrados inline com `<span class="material-symbols-outlined">`

## 6. Design System Notes for Stitch Generation

Use este bloco nos prompts do Stitch para garantir consistência visual:

```
DESIGN SYSTEM LEGISP:
- Visual theme: Editorial Governmental — authoritative, airy, high contrast black & white with red accent
- Primary color: Pure Black (#000000) for CTAs, tags, logo
- Accent color: Institutional Red (#E30613) for hover states, activity borders, highlights
- Background: Pure White (#FFFFFF) main, Light Gray (#F4F4F4) for secondary sections
- Font: Inter (Google Fonts), extrabold/black for titles in uppercase, semibold for body
- Cards: white background, 2px slate-100 border, rounded-xl corners, hover: red border
- Buttons primary: black background → red on hover, rounded-lg
- Buttons outline: 2px black border → black fill on hover, no border-radius (squared editorial style)
- Section headers: font-black italic uppercase tracking-tighter with 4px bottom border
- Layout: max-w-7xl centered, px-6 padding, generous vertical spacing (py-16/py-20)
- Nav header: sticky, glassmorphism (white/80 + backdrop-blur), h-20, border-bottom
- Language: Brazilian Portuguese (pt-BR)
- Icons: Google Material Symbols Outlined
```
