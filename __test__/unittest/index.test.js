describe('Unit test', function() {
  const exampleSet = require('../__dump__/exampleSet');
  describe('Construction', function() {
    // Mocking Express.
    const express = require('express');
    jest.mock('express');
    const callback = jest.fn();
    express.mockReturnValue({get: callback});
    const app = express();

    // Mocking Server.
    const Server = require('../../server');
    Server.constructor = jest.fn(() => ({}));

    // Mocking Client.
    const Client = jest.genMockFromModule('../../client');

    afterEach(() => {
      express.mockClear();
      callback.mockClear();
    });

    const Translator = require('../../index');

    test('Should return an async function', async () => {
      expect(Translator.constructor.name).toBe('AsyncFunction');
    });
  });
});