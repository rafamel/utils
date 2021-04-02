import clonedeep from 'lodash.clonedeep';
import { mergeWith } from './helpers/merge-with';

export type Merge<D, T> = T & (D extends object ? T & D : T);

/**
 * If both `defaults` and `value` are objects, they will be shallow merged.
 * Mutations to the returned object won't have an effect over `defaults`.
 */
export function shallow<D, T = Partial<D>>(defaults: D, value: T): Merge<D, T> {
  const data: any =
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    typeof defaults === 'object' &&
    defaults !== null &&
    !Array.isArray(defaults)
      ? Object.assign(clonedeep(defaults), value)
      : value;
  return data;
}

/**
 * If both `defaults` and `value` are objects, they will be deep merged.
 * Keys with `undefined` values will be treated as non existent, and will acquire their value at `defaults`.
 * Mutations to the returned object won't have an effect over `defaults`.
 * Arrays won't be merged.
 */
export function merge<D, T = Partial<D>>(defaults: D, value: T): Merge<D, T> {
  return mergeWith(defaults, value, (obj, src) => {
    return Array.isArray(src) || Array.isArray(obj)
      ? mergeWith(src, undefined, undefined)
      : undefined;
  });
}

/**
 * If both the `defaults` and `value` are objects, they will be deep merged.
 * Keys with `undefined` values will be treated as non existent, and will acquire their value at `defaults`.
 * Mutations to the returned object won't have an effect over `defaults`.
 * Arrays will be concatenated.
 */
export function deep<D, T = Partial<D>>(defaults: D, value: T): Merge<D, T> {
  return mergeWith(defaults, value, (obj, src) => {
    const isObjArray = Array.isArray(obj);
    const isSrcArray = Array.isArray(src);

    return !isObjArray && !isSrcArray
      ? undefined
      : mergeWith(
          isObjArray && isSrcArray ? obj.concat(src) : src,
          undefined,
          undefined
        );
  });
}
