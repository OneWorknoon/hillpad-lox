/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'custom': { 'max': '900px' },
      xs: '360px',
      'mdd': { 'min': '700px', 'max': '1000px' },
      'ss': { 'min': '300px', 'max': '500px' },
      'xss': { 'min': '300px', 'max': '400px' },
      '2xs': '414px',
      ...defaultTheme.screens
    },
    colors: {
      white: '#FFFFFF',
      light_grey: '#dfe0e2',
      orange: '#FF5757',
      nav_black: '#454056',
      black: '#1f1b2d',
      light_black: '#666276',
      green: '#07c98b',
      light: '#FF5757',
      deep_blue: '#5d3cf2',
      yellow: '#fdbc31',
      grey: 'rgba(67, 89, 113)',
      navy_blue: '#1F1B2D',
      blue: '#3B5998',
      tmpt_blue: '#3B82F6',
      tmpt_light_blue: '#E8F0FE',
      tmpt_bg_light_blue: '#E8F0FE',
      red: '#FF0000',
      light_orange: '#fff4f5',
      border_white: '#efecf3'
    },
    container: {
      center: true,
      padding: '2rem'
    },
    fontFamily: {
      sans: ['"Noto Sans"', 'sans-serif', ...defaultTheme.fontFamily.sans],
      body: ['"Noto Sans"']
    },
    backgroundImage: {
      'purple-gradient': "url('/src/assets/images/blur-gradient.svg')"
    },
    extend: {
      dropShadow: {
        '3xl': '0px 7px 29px 0px rgba(100, 100, 111, 0.2)'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #612121, #FF5757)',
        'hero-radial': 'radial-gradient(circle, #fe6461  0%, #bd0000bf 80%)',
        'hero-bg': 'linear-gradient(to top, #612121, #FF5757)',
      },
      width: {
        65: '16.5rem',
        50: '12.5rem',
        70: '17.0rem',
        73: '18.3rem',
        74: '18.5rem',
        76: '19rem',
        78: '20rem',
        85: '28rem',
        84: '21.5rem',
        100: '30rem',
        110: '38rem',
        88: '23rem',
        '54p': '54%',
        98: '26rem',
        card: '19.1rem'
      },
      height: {
        card: '400',
        card2: '400px',
        imgHeight: '200px',
        textCard: '200px'
      },
      screens: {
        '2xl': '1440px',
        '3xl': '1560px'
      },
      maxWidth: {
        '8xl': '1440px',
        '9xl': '1560px',
        full: '1320px'
      },
      bottom: {
        68: '18rem'
      },
      // Add keyframes and animations here
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scrollReverse: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        scroll: 'scroll 10s linear infinite', // Set a longer duration to display all items
        'scroll-reverse': 'scrollReverse 50s linear infinite',
      },

    },
    plugins: [require('@tailwindcss/line-clamp'), require('tw-elements/dist/plugin.cjs'), require('@tailwindcss/line-clamp'),]
  }
};
