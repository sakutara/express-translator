const examplePo = `
msgid "foo"
msgstr "bar"
`;

describe('Unit test', function() {
  describe('Using Gettext-Parser', function() {
    const {po: {parse}} = require('gettext-parser');
    const {readFileSync} = require('fs');
    jest.mock('gettext-parser');
    jest.mock('fs');
    readFileSync.mockReturnValue(examplePo);

    const Server = require('../../server');
    const {getSet} = new Server();

    afterAll(() => {
      parse.mockRestore();
    });

    test('Should load po data using readFileSync', () => {
      expect(readFileSync).toBeCalledTimes(1);
      expect(readFileSync).toBeCalledWith(`${process.cwd()}/locale/en_US.po`);
      readFileSync.mockRestore();
    });

    test('Should use gettext-parser in constructing Server', () => {
      expect(parse).toBeCalledTimes(1);
      expect(parse).toBeCalledWith(examplePo);
    });
  });
});