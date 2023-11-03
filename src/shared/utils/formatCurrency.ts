export function formatCurrency(value: number, decimal = 2) {
  return toFixed(value, decimal);
}

function toFixed(number: number, fixed: number) {
  const split = String(number).split('.');

  if (split.length > 1) {
    const left = split[0];
    const right = split[1].replace(/0*$/, '');
    return right ? Number(left + '.' + right).toFixed(fixed) : Number(left);
  }

  return number;
}
