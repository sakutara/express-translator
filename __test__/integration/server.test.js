describe('Integration test', function() {
  const validate = set => {
    expect(set).toHaveProperty('translations');
    expect(set.translations).toHaveProperty('');
    expect(set.translations['']).toHaveProperty('foo');
    expect(set.translations[''].foo).toEqual({
      msgid: 'foo',
      msgstr: ['bar'],
    });
  };
  const Server = require('../../server');
  describe('Construction', function() {
    test('Should take source folder as translation source', () => {
      const {getSet} = new Server({src: '__test__/__dump__'});
      validate(getSet());
    });

    test('Should throw error when file not found', () => {
      const invalidFile = () => {
        Server({src: 'foo'});
      };
      expect(invalidFile).toThrowError();
      expect(invalidFile).
          toThrow(`Couldn't find ${process.cwd()}/foo/en_US.po`);
    });
  });

  describe('Translation Set', function() {
    // Default configuration.
    const {getSet} = new Server({src: '__test__/__dump__'});
    const translationSet = getSet();

    test('Translation set should be applicable for client side', async () => {
      const {translate} = await require('../../client')({library: translationSet});
      expect(translate('foo')).toBe('bar');
    });
  });

  describe('Express support', function() {
    const fetch = require('node-fetch');
    const express = require('express');
    // Express app.
    const app = express();
    beforeEach(() => {
      this.server = app.listen(9999);
    });
    afterEach(() => {
      this.server.close();
    });

    test('Should have translate URL', async() => {
      const {getSet} = new Server({app, src: '__test__/__dump__'});


      const res = await fetch('http://localhost:9999/translate');
      expect(res.ok).toBeTruthy();
      validate(await res.json());
    });

    test('Should be able to customize translate URL', async() => {
      const {getSet} = new Server({app, url: '/custom/translate', src: '__test__/__dump__'});
      const res = await fetch('http://localhost:9999/custom/translate');
      expect(res.ok).toBeTruthy();
      validate(await res.json());
    });
  });
});