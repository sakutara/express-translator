/**
 * @fileoverview Gateway of translator.
 * Create and use a Client.
 * Create and use a Server.
 * Connect Client and Server together.
 */

const Index = async function({app = undefined, country = 'US', url, language = 'en', server = false, src} = {}) {
  const Client = require('./client');
  this.status = false;

  let library = {};
  if (!server) {
    const Server = require('./server');
    const {getSet} = new Server({app, src, url, locale: `${language}_${country}`});
    library = getSet();
    this.status = true;
  }
  else {
    const fetch = require('node-fetch');
    const res = await fetch(server);
    if (res.ok) {
      library = await res.json();
      this.status = true;
    }
  }

  const {translate} = await Client({library: library, country, language});
  this.translate = translate;

  return this;
};

exports = module.exports = Index;
