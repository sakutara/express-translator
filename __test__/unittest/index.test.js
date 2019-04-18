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

describe('Translation Set', function() {
  describe('Node-gettext', function() {
    beforeEach(() => {
      this.Gettext = require('node-gettext');
      jest.mock('node-gettext');
      this.translator = require('../../index')({
        library: exampleSet,
      });
    });
    afterEach(() => {
      this.Gettext.mockRestore();
    });
    test('Should use node-gettext to translate', () => {
      expect(this.Gettext).toBeCalled();
    });

    test('Should use addTranslations', () => {
      const translateInstance = this.Gettext.mock.instances[0];
      expect(translateInstance.addTranslations).
          toBeCalledWith('en-US', 'default', exampleSet);
    });
  });
});