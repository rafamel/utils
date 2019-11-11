import { BaseConverter } from 'base-x';
import { Options } from './types';

export default function decode(
  str: string,
  base: BaseConverter,
  options: Options
): string {
  const index = str.indexOf(options.separator);

  return index === -1
    ? str
    : trunk(
        str.slice(0, index),
        base
          .decode(str.slice(index + 1))
          .toString()
          .split('|')
      );
}

export function trunk(str: string, payload: string[]): string {
  if (!payload.length) return str;

  const item = payload.pop() as string;
  const char = item[0];
  const pos = item.slice(1).split('.');
  const from = Number(pos[0]);
  const to = from + (pos.length > 1 ? Number(pos[1]) || 1 : 0);

  return trunk(str.slice(0, from) + char + str.slice(to), payload);
}
