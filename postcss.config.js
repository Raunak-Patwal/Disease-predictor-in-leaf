export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: {
        'color-oklab': false,
        'color-lch': false,
      },
    },
  },
};
