import { Encoder } from '../Encoder';
import { Slug } from '../Slug';

export function encode(
  str: string,
  encoder: Encoder.Type,
  target: RegExp,
  options: Readonly<Slug.Options>
): string {
  const payload: string[] = [];
  return (
    trunk('', str, payload, target, options) +
    (payload.length
      ? options.separator + encoder.encode(payload.join('|'))
      : '')
  );
}

function trunk(
  str: string,
  next: string,
  payload: string[],
  target: RegExp,
  options: Readonly<Slug.Options>
): string {
  if (!next) return str;

  const index = next.search(target);
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
  return trunk(str + replaced, c, payload, target, options);
}
