/**
 * @fileoverview Translation object to control server-side of translation.
 * @package
 *
 */
const {readFileSync} = require('fs');
const {po: {parse}} = require('gettext-parser');
const {join} = require('path');

const Server = function({locale = 'en_US', src = 'locale'} = {}) {
  const data = readFileSync(join(process.cwd(), src, `${locale}.po`));
  const translationSet = parse(data);

  // Get Translation Set.
  this.getSet = () => {
    return translationSet;
  };

  return this;
};

exports = module.exports = Server;