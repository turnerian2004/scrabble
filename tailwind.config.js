/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'text-reveal':
                    'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s',
                typewriter: 'typewriter 2s steps(60) forwards',
            },
            keyframes: {
                'text-reveal': {
                    '0%': {
                        transform: 'translate(0, 100%)',
                    },
                    '100%': {
                        transform: 'translate(0, 0)',
                    },
                },
                typewriter: {
                    to: {
                        left: '100%',
                    },
                },
            },
            gridTemplateColumns: {
                16: 'repeat(16, minmax(0, 1.5rem))',
                15: 'repeat(15, minmax(0, 1.5rem))',
                footer: '200px minmax(900px, 1fr) 100px',
            },
            gridTemplateRows: {
                16: 'repeat(16, minmax(0, 1.5rem))',
                15: 'repeat(15, minmax(0, 1.5rem))',
                layout: '200px minmax(900px, 1fr) 100px',
            },
            gridColumnEnd: {
                13: '13',
                14: '14',
                15: '15',
                16: '16',
                17: '17',
            },
        },
    },
    plugins: [],
}
