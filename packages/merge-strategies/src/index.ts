import mergewith from 'lodash.mergewith';
import clonedeep from 'lodash.clonedeep';

/**
 * If both `defaults` and `value` are objects, they will be shallow merged. Mutations to the returned object won't have an effect over `defaults`.
 */
export function shallow<T, D>(defaults: D, value: T): T | (T & D) {
  return typeof value === 'object' &&
    !Array.isArray(value) &&
    typeof defaults === 'object' &&
    !Array.isArray(defaults)
    ? Object.assign(clonedeep(defaults), value)
    : value;
}

/**
 * If both `defaults` and `value` are objects, they will be deep merged. Arrays won't be merged. Mutations to the returned object won't have an effect over `defaults`.
 */
export function merge<T, D>(defaults: D, value: T): T | (T & D) {
  return mergewith(
    {},
    { data: defaults },
    { data: value },
    (obj: any, src: any) =>
      Array.isArray(src) || Array.isArray(obj) ? src : undefined
  ).data;
}

/**
 * If both the `defaults` and `value` are objects, they will be deep merged. Arrays will be concatenated. Mutations to the returned object won't have an effect over `defaults`.
 */
export function deep<T, D>(defaults: D, value: T): T | (T & D) {
  return mergewith(
    {},
    { data: defaults },
    { data: value },
    (obj: any, src: any) => {
      const a = Array.isArray(obj);
      const b = Array.isArray(src);
      if (!a && !b) return;
      return a && b ? obj.concat(src) : src;
    }
  ).data;
}
