const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const colors = require('./src/colors')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': colors.primary,
      '@layout-header-background': colors.darkGray,
      '@menu-dark-submenu-bg': colors.evenDarkerGray,
      '@font-size-base': '16px',
    },
  })
)
