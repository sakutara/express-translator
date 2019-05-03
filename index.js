/**
 * @fileoverview Gateway of translator.
 * Create and use a Client.
 * Create and use a Server.
 * Connect Client and Server together.
 */

const Index = function({app = undefined, country = 'US', url, language = 'en', src} = {}) {
  const Client = require('./client');
  const Server = require('./server');
  const {getSet} = new Server(
      {app, src, url, locale: `${language}_${country}`});
  const library = getSet();

  // Since we're not passing a server URL.
  // There's no asynchronous in calling Client.
  const {translate} = Client({library: library, country, language});
  this.translate = translate;

  return this;
};

exports = module.exports = Index;
