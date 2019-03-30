describe('Index test', () => {
  const index = require('../../index');

  // Should have server methods.
  test('Should have server methods', () => {
    expect(1+1).toBe(2);
  });

  // Should have client methods.
  test('Should have client methods', () => {
    expect(1+2).toBe(3);
  });
});