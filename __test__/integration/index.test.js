describe('Index test', function() {
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

  // Should have client methods.
  describe('Translator', function() {
    describe('Translation Set', function() {
      beforeAll(() => {
        this.translator = require('../../index')(exampleSet);
      });

      test('Should have been given at startup', () => {
        expect(this.translator.getSet()).toEqual(exampleSet);
      });

      test('Should show new set after update', () => {
        const updateSet = {
          'translations': {
            '': {
              'foo': {
                msgid: 'foo',
                msgstr: ['toi'],
              },
            },
          },
        };
        this.translator.updateSet(updateSet);
        expect(this.translator.getSet()).toEqual(updateSet);
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