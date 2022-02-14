module.exports = {
  content: [
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { helvetica: "helvetica, sans-serif" },
      flex: { 1: "1 1 0%" },
    },
  },
  plugins: [require("flowbite/plugin")],
};
