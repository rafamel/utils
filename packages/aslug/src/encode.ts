import { BaseConverter } from 'base-x';

import { Options } from './types';

const textencoder = new TextEncoder();

export default function encode(
  str: string,
  base: BaseConverter,
  options: Options
): string {
  const payload: string[] = [];
  return (
    trunk('', str, payload, options) +
    (payload.length
      ? options.separator + base.encode(textencoder.encode(payload.join('|')))
      : '')
  );
}

export function trunk(
  str: string,
  next: string,
  payload: string[],
  options: Options
): string {
  if (!next) return str;

  const index = next.search(options.target);
  if (index === -1) return str + next;

  const a = next.slice(0, index);
  const b = next.slice(index, index + 1);
  const c = next.slice(index + 1);

  str += a;
  const map = options.map;
  const replaced = map(b);
  payload.push(
    `${b}${str.length}${
      replaced.length
        ? replaced.length === 1
          ? '.'
          : '.' + replaced.length
        : ''
    }`
  );
  return trunk(str + replaced, c, payload, options);
}
