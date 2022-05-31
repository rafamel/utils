import escape from 'escape-string-regexp';

export function escapeStr(str: string): string {
  return escape(str).replace(/\\x2d/g, '\\-');
}
