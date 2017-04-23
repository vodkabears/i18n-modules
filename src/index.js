const uuid = require('uuid')
const Polyglot = require('node-polyglot')

const i18n = new Polyglot()

// Set default locale from the global variable
if (typeof BUNDLE_LANG !== 'undefined' && BUNDLE_LANG) {
  i18n.locale(BUNDLE_LANG)
}

class I18N {
    /**
     * Set language
     * @param {String} lang
     */
  static setLang (lang) {
    i18n.locale(lang)
  }

    /**
     * Include files with translations
     * @param {Function} mapper Function for including modules
     * @returns {Function} Translation function
     */
  static include (mapper) {
    const namespace = uuid.v4()
    const translations = (typeof BUNDLE_LANG !== 'undefined' && BUNDLE_LANG ? [ BUNDLE_LANG ] : LANGS).map(lang => ({ lang, module: mapper(lang) }))

    i18n.extend(translations.reduce((module, translation) => {
      module[translation.lang] = {
        [namespace]: translation.module
      }

      return module
    }, {}))

    return function (key, options) {
      return i18n.t(`${i18n.locale()}.${namespace}.${key}`, typeof options === 'number'
                ? options
                : Object.assign({ _: '' }, options)
            )
    }
  }
}

module.exports = I18N
