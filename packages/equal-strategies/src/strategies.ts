import { shallowEqual } from 'shallow-equal-object';
import deepEqual from 'lodash.isequal';

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
