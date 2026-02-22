import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                // Enhanced figma purple palette with refined OKLCH values
                figma: {
                    50: 'oklch(0.96 0.02 295)',
                    100: 'oklch(0.92 0.05 295)',
                    200: 'oklch(0.85 0.10 295)',
                    300: 'oklch(0.78 0.18 295)',
                    400: 'oklch(0.72 0.24 295)',
                    500: 'oklch(0.68 0.28 295)',
                    600: 'oklch(0.62 0.26 295)',
                    700: 'oklch(0.54 0.22 295)',
                    800: 'oklch(0.44 0.18 295)',
                    900: 'oklch(0.34 0.14 295)',
                    950: 'oklch(0.24 0.10 295)',
                },
                // Enhanced coral palette with smoother transitions
                coral: {
                    50: 'oklch(0.96 0.02 10)',
                    100: 'oklch(0.92 0.05 10)',
                    200: 'oklch(0.86 0.10 10)',
                    300: 'oklch(0.80 0.16 10)',
                    400: 'oklch(0.75 0.22 10)',
                    500: 'oklch(0.72 0.24 10)',
                    600: 'oklch(0.66 0.22 10)',
                    700: 'oklch(0.58 0.19 10)',
                    800: 'oklch(0.48 0.15 10)',
                    900: 'oklch(0.38 0.12 10)',
                    950: 'oklch(0.28 0.08 10)',
                },
                // Enhanced tangerine palette with warmer tones
                tangerine: {
                    50: 'oklch(0.97 0.02 40)',
                    100: 'oklch(0.93 0.05 40)',
                    200: 'oklch(0.87 0.10 40)',
                    300: 'oklch(0.82 0.16 40)',
                    400: 'oklch(0.78 0.20 40)',
                    500: 'oklch(0.76 0.22 40)',
                    600: 'oklch(0.70 0.20 40)',
                    700: 'oklch(0.62 0.17 40)',
                    800: 'oklch(0.52 0.14 40)',
                    900: 'oklch(0.42 0.11 40)',
                    950: 'oklch(0.32 0.08 40)',
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                xl: 'calc(var(--radius) + 4px)',
                '2xl': 'calc(var(--radius) + 8px)',
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                'glow-sm': '0 0 10px oklch(0.68 0.28 295 / 0.3)',
                'glow-md': '0 0 20px oklch(0.68 0.28 295 / 0.4)',
                'glow-lg': '0 0 30px oklch(0.68 0.28 295 / 0.5)',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
