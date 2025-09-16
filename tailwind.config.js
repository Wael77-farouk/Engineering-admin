/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // هذا السطر يغطي ملفات JavaScript و TypeScript و React (JSX/TSX) داخل مجلد src
    // يمكنك إضافة مسارات أخرى هنا إذا كان لديك ملفات HTML أو قوالب في أماكن أخرى
  ],
  theme: {
    extend: {
      // هنا يمكنك إضافة أو توسيع ثيم Tailwind الافتراضي
      // مثال:
      // colors: {
      //   'custom-blue': '#243c5a',
      // },
      // spacing: {
      //   '128': '32rem',
      // },
    },
  },
  plugins: [], // هنا يمكنك إضافة إضافات Tailwind CSS
};


