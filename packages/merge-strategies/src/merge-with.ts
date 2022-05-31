import lodashMergeWith from 'lodash.mergewith';

const noop = (): void => undefined;

export function mergeWith(
  defaults: any,
  data: any,
  fn?: (obj: any, src: any, stack?: { size?: number }) => any
): any {
  const { value } = lodashMergeWith(
    {},
    { value: defaults },
    data === undefined ? undefined : { value: data },
    fn
      ? (obj, src, _k, _o, _s, ...stack: any[]) => {
          return fn(obj, src, stack[0]);
        }
      : noop
  );

  return value;
}
