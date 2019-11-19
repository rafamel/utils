import { BasicKind, AllResultType, AnyResultType } from './definitions';
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

export function hasOwnKey<
  T,
  N extends string | number | symbol,
  K extends BasicKind | null = null
>(item: T, key: N | N[], kind?: K): item is AllResultType<T, N, K> {
  if (item === null || typeof item !== 'object') return false;

  const keys = Array.isArray(key) ? key : [key];

  for (const k of keys) {
    if (!Object.hasOwnProperty.call(item, k)) return false;
    if (!isKind(item, k, kind)) return false;
  }

  return true;
}

export function hasAnyKey<
  T,
  N extends string | number | symbol,
  K extends BasicKind | null = null
>(item: T, keys: N[], kind?: K): item is AnyResultType<T, N, K> {
  if (item === null || typeof item !== 'object') return false;

  for (const k of keys) {
    if (isKind(item, k, kind)) return true;
  }

  return false;
}

export function hasAnyOwnKey<
  T,
  N extends string | number | symbol,
  K extends BasicKind | null = null
>(item: T, keys: N[], kind?: K): item is AnyResultType<T, N, K> {
  if (item === null || typeof item !== 'object') return false;

  for (const k of keys) {
    if (Object.hasOwnProperty.call(item, k) && isKind(item, k, kind)) {
      return true;
    }
  }

  return false;
}
