describe('Integration test', function() {
  const exampleSet = {
    'translations': {
      '': {
        foo: {
          msgid: 'foo',
          msgstr: ['bar'],
        },
        'foo @time times': {
          msgid: 'foo @time times',
          msgstr: ['bar @time toi', 'bar @time tois'],
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
      const {translate} = require('../../index')({library: exampleSet});

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
            toBe('bar 3 toi');
      });
    });
  });
});