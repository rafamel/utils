import { strict, partial, shallow, deep } from './strategies';

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
      throw new Error(`Invalid equality kind: ${kind}`);
    }
  }
}
