const config = {
  plugins: {
    // Pin Tailwind's resolution base to this project; a stray package.json in
    // the parent folder otherwise makes it look for `tailwindcss` up there.
    "@tailwindcss/postcss": { base: import.meta.dirname },
  },
};

export default config;
