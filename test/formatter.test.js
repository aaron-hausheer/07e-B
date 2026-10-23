import assert from 'node:assert/strict';
import { formatJavaScript, isFormatted } from '../src/formatter.js';

describe('JavaScript formatting with Prettier', function () {
  let unformatted;

  beforeEach(function () {
    unformatted = 'function greet(name){return "Hello, "+name}';
  });

  it('applies configured quotes, indentation, and semicolons', async function () {
    const result = await formatJavaScript(unformatted);

    assert.equal(
      result,
      "function greet(name) {\n  return 'Hello, ' + name;\n}\n",
    );
  });

  it('detects unformatted JavaScript without modifying the input', async function () {
    const original = unformatted;

    assert.equal(await isFormatted(unformatted), false);
    assert.equal(unformatted, original);
  });

  it('accepts JavaScript after formatting', async function () {
    const formatted = await formatJavaScript(unformatted);

    assert.equal(await isFormatted(formatted), true);
  });

  it('produces the same result when formatting twice', async function () {
    const formatted = await formatJavaScript(unformatted);

    assert.equal(await formatJavaScript(formatted), formatted);
  });

  it('rejects invalid JavaScript instead of repairing its logic', async function () {
    await assert.rejects(() => formatJavaScript('function {'), SyntaxError);
  });

  it('formats incorrect logic without detecting the behavior bug', async function () {
    const source = 'function add(first,second){return first-second}';
    const formatted = await formatJavaScript(source);

    assert.equal(await isFormatted(formatted), true);
    assert.ok(formatted.includes('return first - second;'));
  });
});
