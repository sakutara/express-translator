describe('Unit test', function() {
  const exampleSet = require('../__dump__/exampleSet');

  describe('Using Node-gettext', function() {
    // Before all.
    const Gettext = require('node-gettext');
    jest.mock('node-gettext');
    const {translate} = require('../../index')(
        {library: exampleSet});
    const {addTranslations, setLocale, setTextDomain, gettext, pgettext} = Gettext.mock.instances[0];
    gettext.mockReturnValue('bar');

    afterAll(() => {
      Gettext.mockRestore();
    });

    test('Should use node-gettext to translate', () => {
      expect(Gettext).toBeCalled();
    });

    test('Should use addTranslations', () => {
      expect(addTranslations).toBeCalledTimes(1);
      expect(addTranslations).toBeCalledWith('en-US', 'default', exampleSet);
    });

    test('Should use setLocale', () => {
      expect(setLocale).toBeCalledTimes(1);
      expect(setLocale).toBeCalledWith('en-US');
    });

    test('Should use setTextDomain', () => {
      expect(setTextDomain).toBeCalledTimes(1);
      expect(setTextDomain).toBeCalledWith('default');
    });

    test('Should use gettext to translate', () => {
      translate('foo');
      expect(gettext).toBeCalledTimes(1);
      expect(gettext).toBeCalledWith('foo');
    });

    test('Should use pgettext to translate with context', () => {
      translate('foo', {context: 'custom'});
      expect(pgettext).toBeCalledTimes(1);
      expect(pgettext).toBeCalledWith('custom', 'foo');
    });
  });
});