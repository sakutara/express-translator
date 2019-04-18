// index.js
const Gettext = require('node-gettext');

const Translate = function({library = {}, country = 'US', language = 'en', name = 'messages'}) {
  /* Setup. */
  const translator = new Gettext();
  translator.addTranslations(`${language}-${country}`, name, library);
  translator.setLocale(`${language}-${country}`);

  this.translate = (source) => translator.gettext(source);

  this.getSet = () => {
    return library;
  };

  this.updateSet = (update = undefined) => {
    library = update;
  };

  return this;
};

exports = module.exports = Translate;