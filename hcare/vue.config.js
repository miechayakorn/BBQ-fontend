module.exports = {
  pwa: {
    name: 'HCare',
    themeColor: '#99A3FF',
    msTileColor: '#777777',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'th',
      fallbackLocale: 'th',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}