describe('Integration test', function() {
  const Translator = require('../../index');
  describe('Constructor', function() {
    test('Should use take country and language as parameters', async () => {
      const {translate} = await Translator({
        country: 'FR',
        language: 'fr',
      });
      expect(translate('foo')).toBe('toi');
    });
    test('Should be able to use custom locale folder', async () => {
      const {translate} = await Translator({
        src: '__test__/__dump__',
      });
      expect(translate('foo')).toBe('bar');
    });
  });

  describe('Client side support', function() {
    const fetch = require('node-fetch');
    const express = require('express');

    beforeEach(() => {
      // Express app.
      this.app = express();
      this.server = this.app.listen(9999);
    });

    afterEach(() => {
      this.server.close();
    });

    test('Should be able to have a custom url for client side', async () => {
      await Translator({app: this.app, url: '/custom/translate'});
      const res = await fetch('http://localhost:9999/custom/translate');
      expect(res.ok).toBeTruthy();
    });

    test('Should be able to run on client side', async () => {
      // Set app on server side.
      await Translator({app: this.app});

      // Set app on client side.
      const {translate} = await Translator({server: 'http://localhost:9999/translate'});
      expect(translate('foo')).toBe('baz');
    });

  });
});