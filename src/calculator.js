export function add(firstNumber, secondNumber) {
  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    throw new TypeError('Both arguments must be finite numbers.');
  }

  return firstNumber + secondNumber;
}
