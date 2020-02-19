import mergewith from 'lodash.mergewith';
import clonedeep from 'lodash.clonedeep';

export type Merge<D, T> = T & (D extends object ? T & D : T);

/**
 * If both `defaults` and `value` are objects, they will be shallow merged. Mutations to the returned object won't have an effect over `defaults`.
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
 * If both `defaults` and `value` are objects, they will be deep merged. Arrays won't be merged. Mutations to the returned object won't have an effect over `defaults`.
 */
export function merge<D, T = Partial<D>>(defaults: D, value: T): Merge<D, T> {
  const { data }: any = mergewith(
    {},
    { data: defaults },
    { data: value },
    (obj: any, src: any) =>
      Array.isArray(src) || Array.isArray(obj) ? src : undefined
  );
  return data;
}

/**
 * If both the `defaults` and `value` are objects, they will be deep merged. Arrays will be concatenated. Mutations to the returned object won't have an effect over `defaults`.
 */
export function deep<D, T = Partial<D>>(defaults: D, value: T): Merge<D, T> {
  const { data }: any = mergewith(
    {},
    { data: defaults },
    { data: value },
    (obj: any, src: any) => {
      const a = Array.isArray(obj);
      const b = Array.isArray(src);
      if (!a && !b) return;
      return a && b ? obj.concat(src) : src;
    }
  );
  return data;
}
