/**
 * @fileoverview Translation object to control client-side of translation.
 * @package
 * node-gettext
 */

const Gettext = require('node-gettext');
const fetch = require('node-fetch');

const Client = function({library = {}, server = undefined, country = 'US', language = 'en', domain = 'default'} = {}) {
  /* Setup. */
  const translator = new Gettext();
  translator.addTranslations(`${language}-${country}`, domain, library);
  translator.setLocale(`${language}-${country}`);
  translator.setTextDomain(domain);

  if (server) {
    fetch(server).then(res => {
      if (res.ok) {
        res.json().then(library => {
          this.setLibrary(library);
        });
      }
    });
  }

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

  this.setLibrary = (library) => {
    translator.addTranslations(`${language}-${country}`, domain, library);
  };

  return this;
};

exports = module.exports = Client;