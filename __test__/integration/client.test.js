describe('Integration test', function() {
  const exampleSet = require('../__dump__/exampleSet');

  // Should have client methods.
  describe('Translator', function() {
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
});