Translator helper for [Express](http://expressjs.com) using PO files system.
```js
const express = require('express');
const app = express();
const Translator = require('express-translator');
const {translate} = new Translator({app});
translate('Foo');
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install express-translator
```

## Features

  * Support both server-side and client-side translation
  * Focus on high performance
  * 100% test coverage
  * HTTP helpers (redirection, caching, etc)
  * View system supporting 14+ template engines
  * Content negotiation
  * Executable for generating applications quickly
  
## Usage
### Configuration and default options
#### Constructor

Create and return an instance of Translator

**Returns**: `Object` - A Translator instance

**Params**
* `[options]`: `Object` - A set of options
    * `app`: `Object` - An instance of Express
    * `country`: `string` (Default `US`) - Code of country following [ISO 3166-1 Country Code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) 
    * `language`: `string` (Default `en`) - Code of language following [ISO 639-1 Language Code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
    * `url`: `string` (Default `/translate`) - Route for exporting translate data in `JSON` for client-side usage
    * `src`: `string` (Default `locale`) - Relative path to get translation source 
 
#### Translate

Translate provided string

**Returns**: `string` - A translated string if translation found or original string if not

**Params**:
* `source`: `string` - A string to translate
* `[options]`: `Object` - A set of options
    * `context`: `string` - A context to pick the right translation
    * `[params]`: `Object` - keyed list of dynamical value in string
    
### Common Usage

#### Plain text
**locale/fr_FR.po**:
```po
msgid "The quick brown fox jumps over the lazy dog"
msgstr "Le renard brun rapide saute par-dessus le chien paresseux"
```
**app.js**
```js
const {translate} = new Translator({
  app,
  country: 'FR',
  language: 'fr',
});
translate('The quick brown fox jumps over the lazy dog');
// -> "Le renard brun rapide saute par-dessus le chien paresseux"
```

#### Text with a custom context
**locale/fr_FR.po**:
```po
msgid "The quick brown fox jumps over the lazy dog"
msgstr "Le renard brun rapide saute par-dessus le chien paresseux"

msgctxt "different"
msgid "The quick brown fox jumps over the lazy dog"
msgstr "Le renard saute par-dessus le chien"
```
**app.js**
```js
const {translate} = new Translator({
  app,
  country: 'FR',
  language: 'fr',
});
translate('The quick brown fox jumps over the lazy dog', {context: 'different'});
// -> "Le renard saute par-dessus le chien"
```

#### Text with a dynamical param:
**locale/fr_FR.po**:
```po
msgid "You tried @time times"
msgstr "Tu as essayé @time fois"
```
**app.js**
```js
const {translate} = new Translator({
  app,
  country: 'FR',
  language: 'fr',
});
translate('You tried @times times', {params: {'@time': 5}});
// -> "Tu as essayé 5 fois"
```
#### Custom translation source
**public/translation/fr_FR.po**:
```po
msgid "The quick brown fox jumps over the lazy dog"
msgstr "Le renard brun rapide saute par-dessus le chien paresseux"
```
**app.js**
```js
const {translate} = new Translator({
  app,
  src: 'public/translation',
  country: 'FR',
  language: 'fr',
});
translate('The quick brown fox jumps over the lazy dog');
// -> ""Le renard brun rapide saute par-dessus le chien paresseux""
```
#### Custom data endpoint
**locale/fr_FR.po**:
```po
msgid "The quick brown fox jumps over the lazy dog"
msgstr "Le renard brun rapide saute par-dessus le chien paresseux"
```
**app.js**
```js
new Translator({
  app,
  url: '/custom/translation',
  country: 'FR',
  language: 'fr',
});
```
**http://localhost:3000/custom/translation**
```json
{
  "translations": {
    "": {
      "The quick brown fox jumps over the lazy dog": {
        "msgid": "The quick brown fox jumps over the lazy dog",
        "msgstr": [
          "Le renard brun rapide saute par-dessus le chien paresseux"
        ]
      }
    }
  }
}
```

### With template engines 
#### nunjucks
**app.js**
```js
// view engine setup
const nunEnv = nunjucks.configure('views', {
  express: app,
});

// Add translate to be a custom filter.
nunEnv.addFilter('translate', translate);
```
**index.njk**
```twig
{{ 'The quick brown fox jumps over the lazy dog' | translate }}
```

#### EJS
**index.ejs**
```
<%- translate('The quick brown fox jumps over the lazy dog') %>
```

#### Pug
**app.js**
```js
options.filters = {
  translate,
};
```
**index.pug**
```pug
:translate
    The quick brown fox jumps over the lazy dog
```

### Advanced usage
#### Use translation in web browser
This feature needs `Webpack` to convert server-side javascript to client-side
**server.js**
```js
new Translator({
  app,
  country: 'FR',
  language: 'fr',
});
```

**client.js**
```js
import Translator from 'express-translator/client';

const {translate} = Translator({
    server: 'http://localhost:3000/translate',
    language: 'fr',
    country: 'FR',
  });
translate('The quick brown fox jumps over the lazy dog');
// -> "Le renard brun rapide saute par-dessus le chien paresseux"
```

## Potential Features (Not yet supported)
  * Plural translation
  * POT auto-generating
  
## License
MIT

## See also
* [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
* [node-gettext](https://www.npmjs.com/package/node-gettext) - a JavaScript implementation of (a large subset of) gettext, a localization framework originally written in C.
* [gettext-parser](https://www.npmjs.com/package/gettext-parser) - Parse and compile gettext po and mo files with node.js, nothing more, nothing less.
* [node-fecth](https://www.npmjs.com/package/node-fetch) - A light-weight module that brings window.fetch to Node.js
