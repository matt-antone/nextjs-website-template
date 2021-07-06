const colors = require('tailwindcss/colors')
const site = require('./_data/site-data')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue,
      'brand-primary': '#0f5388',
      'brand-secondary': '#CCEBFF',
      'brand-light': 'silver',
     },
     maxHeight: {
       'hero': '700px',
     },
     minHeight: {
       "hero": '25vh'
     },
     extend: {
      fontFamily: {
        'sans': ['Barlow', 'Helvetica', 'Arial', 'sans-serif']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.brand-secondary'),
              '&:hover': {
                color: theme('colors.brand-primary'),
              },
            },
            h1: {
              color: theme('colors.brand-primary'),
            }
          },
        },
      }),
    },
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '60': 60,
      '70': 70,
      '80': 80,
      '90': 90,
      '100': 100,
      'auto': 'auto',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
