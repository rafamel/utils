import { BasicKind, AllResultType } from './definitions';
import { isKind } from './helpers';

export function hasKey<
  T,
  N extends string | number | symbol,
  K extends BasicKind | null = null
>(item: T, key: N | N[], kind?: K): item is AllResultType<T, N, K> {
  if (item === null || typeof item !== 'object') return false;

  const keys = Array.isArray(key) ? key : [key];
  for (const k of keys) {
    if (!isKind(item, k, kind)) return false;
  }
  return true;
}
