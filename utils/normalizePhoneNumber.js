export function normalizePhoneNumber(str) {
  return str.replace(/[^\d]/g, '').trim(); // +38(099)999-99-99 => 3809999999999
}
