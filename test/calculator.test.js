import assert from 'node:assert/strict';
import { add } from '../src/calculator.js';

describe('add', function () {
  it('adds positive numbers', function () {
    assert.equal(add(2, 3), 5);
  });

  it('adds negative numbers', function () {
    assert.equal(add(-2, -3), -5);
  });

  it('handles zero', function () {
    assert.equal(add(0, 5), 5);
  });

  it('adds decimal numbers', function () {
    assert.ok(Math.abs(add(0.1, 0.2) - 0.3) < Number.EPSILON);
  });

  it('rejects non-number and non-finite arguments in either position', function () {
    for (const invalidValue of [
      '2',
      null,
      undefined,
      NaN,
      Infinity,
      -Infinity,
    ]) {
      assert.throws(() => add(invalidValue, 3), TypeError);
      assert.throws(() => add(3, invalidValue), TypeError);
    }
  });
});
