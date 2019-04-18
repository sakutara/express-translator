// index.js
const Gettext = require('node-gettext');

const Translate = function({library = {}, country = 'US', language = 'en', name = 'default'}) {
  /* Setup. */
  const translator = new Gettext();
  translator.addTranslations(`${language}-${country}`, name, library);

  this.translate = (source) => {

    console.log(source);
    return 'bar';
  };

  this.getSet = () => {
    return params.set;
  };

  this.updateSet = (update = undefined) => {
    params.set = update;
  };

  return this;
};

exports = module.exports = Translate;