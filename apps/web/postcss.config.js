const postcssReporterFormatter = require('postcss-reporter/lib/formatter')

const isProd = process.env.NODE_ENV === 'production'
const supportsIE11 = false
const enableCssGrid = false

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    ...(isProd
      ? {
          'postcss-100vh-fix': {},
          'postcss-flexbugs-fixes': {},
          'postcss-preset-env': {
            autoprefixer: {
              flexbox: 'no-2009',
              // https://github.com/postcss/autoprefixer#does-autoprefixer-polyfill-grid-layout-for-ie
              ...(enableCssGrid
                ? {
                    grid: 'autoplace',
                  }
                : {}),
            },
            stage: 3,
            features: {
              'custom-properties': supportsIE11,
            },
          },
          cssnano: {},
        }
      : {}),
    'postcss-reporter': {
      formatter: postcssReporterFormatter(),
    },
  },
}
