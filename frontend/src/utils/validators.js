export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRules = [
  { label: '8+ characters', test: (value = '') => value.length >= 8 },
  { label: 'Uppercase letter', test: (value = '') => /[A-Z]/.test(value) },
  { label: 'Lowercase letter', test: (value = '') => /[a-z]/.test(value) },
  { label: 'Number', test: (value = '') => /\d/.test(value) },
  { label: 'Special character', test: (value = '') => /[^A-Za-z0-9]/.test(value) }
];
export const passwordStrength = (value = '') => passwordRules.filter((rule) => rule.test(value)).length;
export const required = (message) => ({ required: message });
