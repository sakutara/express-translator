// index.js
const Gettext = require('node-gettext');

const Translate = function(...kwargs) {
  /* Setup. */
  // Update default parameters.
  const params = Object.assign({
    set: {},
    country: 'US',
    language: 'en',
    name: 'default',
  }, kwargs);

  const translator = new Gettext();
  translator.addTranslations(`${params.country}-${params.language}`, params.name, params.set);

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