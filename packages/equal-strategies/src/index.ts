import { shallowEqual } from 'shallow-equal-object';
import deepEqual from 'lodash.isequal';

export type EqualityKind = 'strict' | 'partial' | 'shallow' | 'deep';

export function compare<T>(
  kind: EqualityKind,
  value: T,
  query: any
): query is T {
  switch (kind) {
    case 'strict': {
      return strict(value, query);
    }
    case 'partial': {
      return partial(value, query);
    }
    case 'shallow': {
      return shallow(value, query);
    }
    case 'deep': {
      return deep(value, query);
    }
    default: {
      throw Error(`Invalid equality kind: ${kind}`);
    }
  }
}

export function strict<T>(value: T, query: any): query is T {
  return value === query;
}

export function partial<T>(value: T, query: any): query is T {
  if (value === query) {
    return true;
  }

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  if (typeof query !== 'object' || query === null || Array.isArray(query)) {
    return false;
  }

  const keys = Object.keys(value) as Array<keyof T>;
  for (const key of keys) {
    if (value[key] !== query[key]) return false;
  }
  return true;
}

export function shallow<T>(value: T, query: any): query is T {
  return shallowEqual(value, query);
}

export function deep<T>(value: T, query: any): query is T {
  return deepEqual(value, query);
}
