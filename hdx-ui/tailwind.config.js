/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // PrimeNG ships its own base styles; Tailwind's preflight reset would fight them.
  corePlugins: {
    preflight: false,
  },
};
