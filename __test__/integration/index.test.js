describe('Integration test', function() {
  const exampleSet = {
    'translations': {
      '': {
        foo: {
          msgid: 'foo',
          msgstr: ['bar'],
        },
      },
    },
  };

  // Should have client methods.
  describe('Translator', function() {
    describe('Translation Set', function() {
      beforeAll(() => {
        this.translator = require('../../index')({library: exampleSet});
      });

      test('Should have been given at startup', () => {
        expect(this.translator.getSet()).toEqual(exampleSet);
      });
    });

    describe('Translation function', function() {
      this.translator = require('../../index')(exampleSet);
      test('Should have translate function', () => {
        expect(typeof this.translator.translate).toEqual('function');
      });

      test('Should translate', () => {
        expect(this.translator.translate('foo')).toBe('bar');
      });
    });
  });
});