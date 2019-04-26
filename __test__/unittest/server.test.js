const examplePo = `
msgid "foo"
msgstr "bar"
`;

describe('Unit test', function() {
  const Server = require('../../server');
  const {po: {parse}} = require('gettext-parser');
  const {readFileSync} = require('fs');
  jest.mock('gettext-parser');
  jest.mock('fs');
  readFileSync.mockReturnValue(examplePo);
  const express = require('express');
  jest.mock('express');
  express.mockReturnValue({get: () => {}});
  const callback = jest.fn();

  afterEach(() => {
    express.mockClear();
    callback.mockClear();
  });

  describe('Using Gettext-Parser', function() {
    new Server();

    test('Should load po data using readFileSync', () => {
      expect(readFileSync).toBeCalledTimes(1);
      expect(readFileSync).toBeCalledWith(`${process.cwd()}/locale/en_US.po`);
    });

    test('Should use gettext-parser in constructing Server', () => {
      expect(parse).toBeCalledTimes(1);
      expect(parse).toBeCalledWith(examplePo);
    });
  });

  describe('Register in Express', function() {
    beforeEach(() => {
      express.mockReturnValue({get: callback});
      new Server({src: '__test__/__dump__'});
    });

    test('Should use Express', () => {
      expect(express).toBeCalledTimes(1);
    });

    test('Should register /translate in express', () => {
      expect(callback).toBeCalledTimes(1);
    });
  });
});