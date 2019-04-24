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
  const callback = jest.fn();
  express.mockReturnValue({get: callback});

  describe('Using Gettext-Parser', function() {
    const {getSet} = new Server();

    test('Should load po data using readFileSync', () => {
      expect(readFileSync).toBeCalledTimes(2);
      expect(readFileSync).toBeCalledWith(`${process.cwd()}/locale/en_US.po`);
      readFileSync.mockRestore();
    });

    test('Should use gettext-parser in constructing Server', () => {
      expect(parse).toBeCalledTimes(2);
      expect(parse).toBeCalledWith(examplePo);
    });
  });

  describe('Register in Express', function() {

    const {getSet} = new Server({src: '__test__/__dump__'});

    test('Should use Express', () => {
      expect(express).toBeCalledTimes(2);
    });

    test('Should register /translate in express', () => {
      expect(callback).toBeCalledTimes(2);
    });
  });
});