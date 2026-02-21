/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Inter', 'sans-serif'],
            },
            colors: {
                // Mint & Blue Palette - Fresh, Calm, Modern
                background: "#ECFEFF", // Light Mint
                foreground: "#1F2937", // Charcoal

                primary: {
                    DEFAULT: "#2DD4BF", // Mint Green
                    foreground: "#ffffff",
                },

                secondary: {
                    DEFAULT: "#60A5FA", // Soft Blue
                    foreground: "#ffffff",
                },

                accent: {
                    DEFAULT: "#86EFAC", // Pastel Green
                    foreground: "#1F2937",
                },

                muted: {
                    DEFAULT: "#F0FDF4", // Very light mint/white mix
                    foreground: "#6B7280", // Slate 500
                },

                card: {
                    DEFAULT: "#ffffff",
                    foreground: "#1F2937",
                },

                border: "#CCFBF1", // Teal 100 - Subtle mint border
                input: "#CCFBF1",
                ring: "#2DD4BF", // Mint focus ring

                // Kept for backward compatibility if needed, but mapped to new palette
                success: {
                    DEFAULT: "#10b981",
                    foreground: "#ffffff",
                },
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                // SKEUOMORPHIC SHADOWS FOR #EFF6FF (Light Blue/Gray) background
                'skeuo-primary': '5px 5px 12px #cdd8eb, -5px -5px 12px #ffffff',
                'skeuo-primary-active': 'inset 4px 4px 8px #cdd8eb, inset -4px -4px 8px #ffffff',

                'skeuo-premium': '14px 14px 28px #cbd5e1, -14px -14px 28px #ffffff',
                'skeuo-premium-inset': 'inset 6px 6px 12px #cbd5e1, inset -6px -6px 12px #ffffff',
                'skeuo-premium-focus': 'inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff, 0 0 0 3px rgba(20, 184, 166, 0.4)',

                // Pill / Navbar specific
                'skeuo-nav': '0px 10px 30px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)',

                // Utility Depths
                'skeuo-sm': '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff',
                'skeuo-md': '8px 8px 16px #cbd5e1, -8px -8px 16px #ffffff',
                'skeuo-lg': '12px 12px 24px #cbd5e1, -12px -12px 24px #ffffff',
                'skeuo-inset-sm': 'inset 2px 2px 5px #cbd5e1, inset -2px -2px 5px #ffffff',
                'skeuo-inset-md': 'inset 5px 5px 10px #cbd5e1, inset -5px -5px 10px #ffffff',
            },
            keyframes: {
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.7', transform: 'scale(1.05)' }
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 4s ease-in-out infinite'
            }
        },
    },
    plugins: [],
}
