import lodashMergeWith from 'lodash.mergewith';

const noop = (): void => undefined;

export function mergeWith(
  defaults: any,
  value: any,
  fn?: (obj: any, src: any, stack?: { size?: number }) => any
): any {
  const { data } = lodashMergeWith(
    {},
    { data: defaults },
    value === undefined ? undefined : { data: value },
    fn
      ? (obj, src, _k, _o, _s, ...stack: any[]) => {
          return fn(obj, src, stack[0]);
        }
      : noop
  );

  return data;
}
