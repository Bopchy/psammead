/* eslint-disable no-console */
const stripAnsi = require('strip-ansi');
const report = require('../src/report');

describe(`Publish Script - report`, () => {
  it('renders logs correctly when multiple successes and failures', () => {
    console.log = jest.fn();

    const attempted = {
      success: ['@bbc/psammead-foobar@1.1.1', '@bbc/psammead-boofar@1.1.1'],
      failure: ['@bbc/psammead-feeboo@1.1.1'],
    };

    report(attempted);

    const expectedOutput = [
      'Published: 2 Successful, 1 Failed, 3 total',
      'Successful',
      '@bbc/psammead-foobar@1.1.1',
      '@bbc/psammead-boofar@1.1.1',
      'Failed',
      '@bbc/psammead-feeboo@1.1.1',
    ];

    expectedOutput.forEach((element, index) => {
      expect(stripAnsi(console.log.mock.calls[index][0])).toEqual(
        expect.stringContaining(element),
      );
    });

    expect(console.log.mock.calls).toHaveLength(6);
  });

  it('renders logs correctly with successes but no failures', () => {
    console.log = jest.fn();

    const attempted = { success: ['@bbc/psammead-foobar@1.1.1'], failure: [] };

    report(attempted);

    const expectedOutput = [
      'Published: 1 Successful, 1 total',
      'Successful',
      '@bbc/psammead-foobar@1.1.1',
    ];

    expectedOutput.forEach((element, index) => {
      expect(stripAnsi(console.log.mock.calls[index][0])).toEqual(
        expect.stringContaining(element),
      );
    });

    expect(console.log.mock.calls).toHaveLength(3);
  });

  it('renders logs correctly with failures but no successes', () => {
    console.log = jest.fn();

    const attempted = { success: [], failure: ['@bbc/psammead-feeboo@1.1.1'] };

    report(attempted);

    const expectedOutput = [
      'Published: 1 Failed, 1 total',
      'Failed',
      '@bbc/psammead-feeboo@1.1.1',
    ];

    expectedOutput.forEach((element, index) => {
      expect(stripAnsi(console.log.mock.calls[index][0])).toEqual(
        expect.stringContaining(element),
      );
    });

    expect(console.log.mock.calls).toHaveLength(3);
  });

  it('renders logs correctly with no successes or failures', () => {
    console.log = jest.fn();

    const attempted = { success: [], failure: [] };

    report(attempted);

    expect(stripAnsi(console.log.mock.calls[0][0])).toEqual(
      expect.stringContaining('Published: 0 total'),
    );

    expect(console.log.mock.calls).toHaveLength(1);
  });
});
