describe('Unit test', function() {
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

  describe('Using Node-gettext', function() {
    beforeAll(() => {
      this.Gettext = require('node-gettext');
      jest.mock('node-gettext');
      this.translator = require('../../index')({
        library: exampleSet,
      });
      this.gt = this.Gettext.mock.instances[0];
    });

    afterAll(() => {
      this.Gettext.mockRestore();
    });

    test('Should use node-gettext to translate', () => {
      expect(this.Gettext).toBeCalled();
    });

    test('Should use addTranslations', () => {
      expect(this.gt.addTranslations).toBeCalledTimes(1);
      expect(this.gt.addTranslations).
          toBeCalledWith('en-US', 'default', exampleSet);
    });

    test('Should use setLocale', () => {
      expect(this.gt.setLocale).toBeCalledTimes(1);
      expect(this.gt.setLocale).toBeCalledWith('en-US');
    });

    test('Should use setTextDomain', () => {
      expect(this.gt.setTextDomain).toBeCalledTimes(1);
      expect(this.gt.setTextDomain).toBeCalledWith('default');
    });

    test('Should use gettext to translate', () => {
      this.translator.translate('foo');
      expect(this.gt.gettext).toBeCalledTimes(1);
      expect(this.gt.gettext).toBeCalledWith('foo');
    });

    test('Should use pgettext to translate with context', () => {
      this.translator.translate('foo', {context: 'custom'});
      expect(this.gt.pgettext).toBeCalledTimes(1);
      expect(this.gt.pgettext).toBeCalledWith('custom', 'foo');
    });
  });
});