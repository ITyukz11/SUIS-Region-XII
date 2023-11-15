/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        "navy-primary":"#053B50",
        "blue-primary":"#176B87",
        "teal-primary":"#64CCC5",
        "grey-primary":"#EEEEEE",

        "login-primary":"#01091C",
        "light-primary":"#F0F2F5",

        "ccis-primary":"#2F5597",
        "mne-primary":"#f8ba57",
        "ess-primary":"#8d9f85",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    }, // Extend max-height property
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
  },
  plugins: [
    require("tailwindcss-inner-border")
  ],
}
