import { mergeWith } from './merge-with';

export type Merge<D, T> = T & (D extends object ? T & D : T);

/**
 * If both `defaults` and `data` are objects, they will be shallow merged.
 * Keys with `undefined` values in a `data` object will acquire their value at `defaults`.
 * Mutations to the returned object won't have an effect over `defaults`.
 * Arrays won't be merged.
 */
export function shallow<D, T = Partial<D>>(defaults: D, data: T): Merge<D, T> {
  return mergeWith(defaults, data, (obj, src, stack) => {
    if (!stack || typeof stack.size !== 'number') {
      throw new Error(`merge stack error`);
    }

    return stack.size > 0 || Array.isArray(src) || Array.isArray(obj)
      ? mergeWith(src, undefined, undefined)
      : undefined;
  });
}

/**
 * If both `defaults` and `data` are objects, they will be deep merged.
 * Keys with `undefined` values in a `data` object will acquire their value at `defaults`.
 * Mutations to the returned object won't have an effect over `defaults`.
 * Arrays won't be merged.
 */
export function merge<D, T = Partial<D>>(defaults: D, data: T): Merge<D, T> {
  return mergeWith(defaults, data, (obj, src) => {
    return Array.isArray(src) || Array.isArray(obj)
      ? mergeWith(src, undefined, undefined)
      : undefined;
  });
}

/**
 * If both `defaults` and `data` are objects, they will be deep merged.
 * Keys with `undefined` values in a `data` object will acquire their value at `defaults`.
 * Mutations to the returned object won't have an effect over `defaults`.
 * Arrays will be concatenated.
 */
export function deep<D, T = Partial<D>>(defaults: D, data: T): Merge<D, T> {
  return mergeWith(defaults, data, (obj, src) => {
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
