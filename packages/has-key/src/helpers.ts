import { BasicKind } from './definitions';

export function isKind(
  item: any,
  key: string | number | symbol,
  kind?: BasicKind | null
): boolean {
  const value = item[key];

  switch (kind) {
    case null:
    case undefined: {
      if (value === undefined) return false;
      break;
    }
    case 'null': {
      if (value !== null) return false;
      break;
    }
    case 'array': {
      if (!Array.isArray(value)) return false;
      break;
    }
    default: {
      // eslint-disable-next-line valid-typeof
      if (typeof value !== kind) return false;
      if (kind === 'object' && (value === null || Array.isArray(value))) {
        return false;
      }
    }
  }

  return true;
}
