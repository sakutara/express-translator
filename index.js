// index.js
const Gettext = require('node-gettext');

const Translate = function({library = {}, country = 'US', language = 'en', domain = 'default'}) {
  /* Setup. */
  const translator = new Gettext();
  translator.addTranslations(`${language}-${country}`, domain, library);
  translator.setLocale(`${language}-${country}`);
  translator.setTextDomain(domain);

  this.translate = (source, {context = '', params = {}} = {}) => {
    // Translate string.
    let translated = context ?
        translator.pgettext(context, source) :
        translator.gettext(source);

    // Apply dynamical content to string.
    Object.entries(params).forEach(([key, value]) => {
      translated = translated.replace(new RegExp(key, 'g'), value);
    });

    return translated;
  };

  return this;
};

exports = module.exports = Translate;