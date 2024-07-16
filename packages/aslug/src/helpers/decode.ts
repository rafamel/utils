import type { Encoder } from '../Encoder';
import type { Slug } from '../Slug';

export function decode(
  str: string,
  encoder: Encoder.Type,
  options: Readonly<Slug.Options>
): string {
  const index = str.indexOf(options.separator);

  return index === -1
    ? str
    : trunk(
        str.slice(0, index),
        encoder.decode(str.slice(index + 1)).split('|')
      );
}

function trunk(str: string, payload: string[]): string {
  if (!payload.length) return str;

  const item = payload.pop() as string;
  const char = item[0];
  const pos = item.slice(1).split('.');
  const from = Number.parseInt(pos[0]);
  const to = from + (pos.length > 1 ? Number.parseInt(pos[1]) || 1 : 0);

  return trunk(str.slice(0, from) + char + str.slice(to), payload);
}
