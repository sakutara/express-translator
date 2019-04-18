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
    test('Should use node-gettext to translate', () => {
      const gt = require('node-gettext');
      jest.mock('node-gettext');
      this.translator = require('../../index')(exampleSet);
      expect(gt).toBeCalled();
      gt.mockRestore();
    });
  });
});