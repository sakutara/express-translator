describe('Integration test', function() {
  const exampleSet = {
    'translations': {
      '': {
        foo: {
          msgid: 'foo',
          msgstr: ['bar'],
        },
      },
      custom: {
        foo: {
          msgid: 'foo',
          msgstr: ['toi'],
        },
      },
    },
  };

  // Should have client methods.
  describe('Translator', function() {
    describe('Translation function', function() {
      this.translator = require('../../index')({library: exampleSet});
      test('Should have translate function', () => {
        expect(typeof this.translator.translate).toEqual('function');
      });

      test('Should translate using default context', () => {
        expect(this.translator.translate('foo')).toBe('bar');
      });

      test('Should translate using custom context', () => {
        expect(this.translator.translate('foo', {context: 'custom'})).
            toBe('toi');
      });
    });
  });
});