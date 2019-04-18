// index.js
const Gettext = require('node-gettext');

const Translate = function({library = {}, country = 'US', language = 'en', domain = 'default'}) {
  /* Setup. */
  const translator = new Gettext();
  translator.addTranslations(`${language}-${country}`, domain, library);
  translator.setLocale(`${language}-${country}`);
  translator.setTextDomain(domain);

  this.translate = (source, {context = ''} = {}) => {
    const translated = context ?
        translator.pgettext(context, source) :
        translator.gettext(source);
    console.log(translated);
    return translated;
  };

  return this;
};

exports = module.exports = Translate;