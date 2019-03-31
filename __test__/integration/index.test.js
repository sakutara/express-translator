describe('Index test', function() {
  const translator = require('../../index')();

  // Should have client methods.
  describe('Translator', function() {
    test('Should have translate function', () => {
      expect(typeof translator.translate).toEqual('function');
    });

    test('Should have getSet function', () => {
      expect(typeof translator.getSet).toEqual('function');
    });

    describe('Translation Set', function() {
      const exampleSet = {
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
        this.translator = require('../../index')(exampleSet);
        this.set = this.translator.getSet();
      });

      test('Should have been given at startup', () => {
        expect(this.set).toEqual(exampleSet);
      });

      test('Should be able to update', () => {
        expect(typeof this.translator.updateSet).toEqual('function');
      });
    });
  });
});