function asInt(value) {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return null;
  return parsed;
}

function asTrimmedString(value, { min = 1, max = 200 } = {}) {
  if (value === undefined || value === null) return null;
  const s = String(value).trim();
  if (s.length < min || s.length > max) return null;
  return s;
}

module.exports = { asInt, asTrimmedString };
