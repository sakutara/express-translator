describe('Integration test', function() {
  const exampleSet = require('../__dump__/exampleSet');
  const updateSet = require('../__dump__/updateSet');

  // Should have client methods.
  describe('Construction', function() {
    const Client = require('../../client');

    // Default translator.
    const {translate} = new Client({library: exampleSet});

    test('Should support multiple domains', () => {
      // Second domain.
      const {translate: domainTranslate} = new Client(
          {domain: 'custom', library: updateSet});
      expect(domainTranslate('foo')).not.toEqual(translate('foo'));
    });

    test('Should support multiple languages', () => {
      const {translate: regionTranslate} = new Client(
          {language: 'vi', library: updateSet});
      expect(regionTranslate('foo')).not.toEqual(translate('foo'));
    });

    test('Should support multiple countries', () => {
      const {translate: countryTranslate} = new Client(
          {country: 'VN', library: updateSet});
      expect(countryTranslate('foo')).not.toEqual(translate('foo'));
    });
  });

  describe('Translation function', function() {
    const {translate} = require('../../client')(
        {library: exampleSet});

    test('Should have translate function', () => {
      expect(typeof translate).toEqual('function');
    });

    test('Should translate using default context', () => {
      expect(translate('foo')).toBe('bar');
    });

    test('Should translate using custom context', () => {
      expect(translate('foo', {context: 'custom'})).
          toBe('toi');
    });

    test('Should translate using dynamical variables', () => {
      expect(translate('foo @time times', {params: {'@time': 3}})).
          toBe('toi 3 bars');
    });
  });
});