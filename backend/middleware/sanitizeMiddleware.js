const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

const sanitizeString = (value) =>
  value
    .replace(/\0/g, '')
    .replace(/[\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .replace(/[&<>"'`]/g, (character) => entityMap[character]);

const sanitizeValue = (value) => {
  if (typeof value === 'string') return sanitizeString(value);
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, nestedValue]) => [key, sanitizeValue(nestedValue)]));
  }
  return value;
};

export default function sanitizeMiddleware(req, _res, next) {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.params) req.params = sanitizeValue(req.params);
  if (req.query) req.query = sanitizeValue(req.query);
  next();
}
