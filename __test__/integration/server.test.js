describe('Integration test', function() {
  const Server = require('../../server');
  describe('Construction', function() {
    test('Should take source folder as translation source', () => {
      const {getSet} = new Server({src: '__test__/__dump__'});
      const translationSet = getSet();
      expect(translationSet).toHaveProperty('translations');
      expect(translationSet.translations).toHaveProperty('');
      expect(translationSet.translations['']).toHaveProperty('foo');
      expect(translationSet.translations[''].foo).toEqual({
        msgid: 'foo',
        msgstr: ['bar'],
      });
    });
  });
  describe('Translation Set', function() {
    // Default configuration.
    const {getSet} = new Server({src: '__test__/__dump__'});
    const translationSet = getSet();

    test('Translation set should be applicable for client side', () => {
      const {translate} = require('../../client')({library: translationSet});
      expect(translate('foo')).toBe('bar');
    });
  });
});