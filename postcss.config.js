module.exports = {
  plugins: {
    stylelint: {},
    'postcss-import': {},
    precss: {},
    'rucksack-css': {},
    'postcss-cssnext': {
      browsers: ['last 1 versions', 'ie >= 11'],
      features: {
        autoprefixer: { grid: 'autoplace' }
      }
    },
    'postcss-em-media-query': {},
    'postcss-assets': {
      relative: true
    },
    'css-mqpacker': {
      sort: true
    },
    'postcss-reporter': {
      clearMessages: true
    }
  }
};
