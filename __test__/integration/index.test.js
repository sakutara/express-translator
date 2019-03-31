describe('Index test', function() {
  const translator = require('../../index')();

  // Should have client methods.
  describe('Translator', function() {
    test('Should have translate function', () => {
      expect(typeof translator.translate).toEqual('function');
    });

    test('Should have getTranslationSet function', () => {
      expect(typeof translator.getTranslationSet).toEqual('function');
    });

    describe('Translation Set', function() {
      const exampleTranslationSet = {
        'translations': {
          '': {
            'foo': {
              msgid: 'foo',
              msgstr: ['bar'],
            },
          },
        },
      };
      beforeAll(() => {
        this.translator = require('../../index')(exampleTranslationSet);
        this.translationSet = this.translator.getTranslationSet();
      });

      test('Should have been given at startup', () => {
        expect(this.translationSet).toEqual(exampleTranslationSet);
      });

      test('Should be an object', () => {
        expect(typeof this.translationSet).toEqual('object');
      });
    });
  });
});