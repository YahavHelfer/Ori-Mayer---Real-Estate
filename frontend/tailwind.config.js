// frontend/tailwind.config.js (או .ts)
module.exports = { // או export default אם זה .ts
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    // הוסף נתיבים נוספים אם יש לך קבצים במקומות אחרים
  ],
  theme: {
    extend: {
      colors: { // אם הגדרת צבעים מותאמים אישית
        'custom-gold': '#B08D57',
        'custom-black': '#1A1A1A',
        'gold-text': '#EAE0D5',
      },
    },
  },
  plugins: [],
};