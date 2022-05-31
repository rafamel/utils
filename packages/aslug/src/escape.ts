import escape from 'escape-string-regexp';

export default function (str: string): string {
  return escape(str).replace(/\\x2d/g, '\\-');
}
