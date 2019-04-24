/**
 * @fileoverview Translation object to control server-side of translation.
 * @package
 *
 */
const {readFileSync} = require('fs');
const {po: {parse}} = require('gettext-parser');
const {join} = require('path');
const express = require('express');

const Server = function({locale = 'en_US', src = 'locale', url = '/translate', app = express()} = {}) {
  let translationSet = {};
  const file = join(process.cwd(), src, `${locale}.po`);
  try {
    const data = readFileSync(file);
    translationSet = parse(data);
  } catch (e) {
    throw `Couldn't find ${file}`;
  }

  // Setup Express.
  app.get(url, (req, res) => {
    res.json(translationSet);
  });

  // Get Translation Set.
  this.getSet = () => {
    return translationSet;
  };

  return this;
};

exports = module.exports = Server;