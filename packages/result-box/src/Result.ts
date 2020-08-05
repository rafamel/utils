/* eslint-disable no-dupe-class-members */
import { isPromiseLike } from './helpers/is-promise';
import { CreateResult } from './types';

const symbol = Symbol('internal');

interface ResultInternal<
  T,
  E extends Error = Error,
  S extends boolean = boolean
> {
  value?: T;
  error?: E;
  success: S;
}

export class Result<
  T = any,
  E extends Error = Error,
  S extends boolean = boolean
> {
  private [symbol]: ResultInternal<T, E, S>;
  protected constructor(success: S, error?: E, value?: T) {
    /* istanbul ignore next */
    if (success && error) {
      throw Error(`Result can't succeed and contain an error`);
    } else if (!success && !error) {
      throw Error(`Result can't fail and lack an error`);
    }

    this[symbol] = { success, error, value };
  }
  public get success(): S {
    return this[symbol].success;
  }
  public get value(): T {
    const internal = this[symbol];
    if (!internal.success) {
      throw Error(`Can't get value of an unsuccessful result`);
    }
    return internal.value as T;
  }
  public get error(): E {
    const internal = this[symbol];
    if (internal.success) {
      throw Error(`Can't get error of a successful result`);
    }
    return internal.error as E;
  }
  public static pass<T = void, E extends Error = Error>(
    value?: T
  ): Result<T, E, true> {
    return new Result(true, undefined, value || undefined) as Result<
      T,
      E,
      true
    >;
  }
  public static fail<T = void, E extends Error = Error>(
    error: E
  ): Result<T, E, false> {
    return new Result(false, error) as Result<T, E, false>;
  }
  public static create<T, E extends Error = Error>(
    fn: () => T,
    map?: (error: Error) => E
  ): CreateResult<T, E> {
    try {
      const value = fn();
      return (isPromiseLike(value)
        ? Promise.resolve(
            value.then(
              (value) => Result.pass(value),
              (err) => Result.fail(map ? map(err) : err)
            )
          )
        : Result.pass(value)) as any;
    } catch (err) {
      const error = map ? map(err) : err;
      return Result.fail(error) as any;
    }
  }
  public static consume<T>(result: Promise<Result<T>>): Promise<T>;
  public static consume<T>(result: Result<T>): T;
  public static consume<T>(
    result: Promise<Result<T>> | Result<T>
  ): Promise<T> | T;
  public static consume<T>(
    result: Promise<Result<T>> | Result<T>
  ): Promise<T> | T {
    if (isPromiseLike(result)) {
      return Promise.resolve(
        result.then((result) =>
          result.success ? result.value : Promise.reject(result.error)
        )
      );
    }
    if (result.success) return result.value;
    throw result.error;
  }
  public static combine<R1, E1 extends Error>(
    r1: Result<R1, E1> | (() => Result<R1, E1>)
  ): Result<[R1], E1>;
  public static combine<R1, R2, E1 extends Error, E2 extends Error>(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>)
  ): Result<[R1, R2], E1 | E2>;
  public static combine<
    R1,
    R2,
    R3,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>)
  ): Result<[R1, R2, R3], E1 | E2 | E3>;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>)
  ): Result<[R1, R2, R3, R4], E1 | E2 | E3 | E4>;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>)
  ): Result<[R1, R2, R3, R4, R5], E1 | E2 | E3 | E4 | E5>;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>)
  ): Result<[R1, R2, R3, R4, R5, R6], E1 | E2 | E3 | E4 | E5 | E6>;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>)
  ): Result<[R1, R2, R3, R4, R5, R6, R7], E1 | E2 | E3 | E4 | E5 | E6 | E7>;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    R8,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error,
    E8 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>),
    r8: Result<R8, E8> | (() => Result<R8, E8>)
  ): Result<
    [R1, R2, R3, R4, R5, R6, R7, R8],
    E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8
  >;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    R8,
    R9,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error,
    E8 extends Error,
    E9 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>),
    r8: Result<R8, E8> | (() => Result<R8, E8>),
    r9: Result<R9, E9> | (() => Result<R9, E9>)
  ): Result<
    [R1, R2, R3, R4, R5, R6, R7, R8, R9],
    E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9
  >;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    R8,
    R9,
    R10,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error,
    E8 extends Error,
    E9 extends Error,
    E10 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>),
    r8: Result<R8, E8> | (() => Result<R8, E8>),
    r9: Result<R9, E9> | (() => Result<R9, E9>),
    r10: Result<R10, E10> | (() => Result<R10, E10>)
  ): Result<
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10],
    E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10
  >;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    R8,
    R9,
    R10,
    R11,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error,
    E8 extends Error,
    E9 extends Error,
    E10 extends Error,
    E11 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>),
    r8: Result<R8, E8> | (() => Result<R8, E8>),
    r9: Result<R9, E9> | (() => Result<R9, E9>),
    r10: Result<R10, E10> | (() => Result<R10, E10>),
    r11: Result<R11, E11> | (() => Result<R11, E11>)
  ): Result<
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11],
    E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11
  >;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    R8,
    R9,
    R10,
    R11,
    R12,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error,
    E8 extends Error,
    E9 extends Error,
    E10 extends Error,
    E11 extends Error,
    E12 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>),
    r8: Result<R8, E8> | (() => Result<R8, E8>),
    r9: Result<R9, E9> | (() => Result<R9, E9>),
    r10: Result<R10, E10> | (() => Result<R10, E10>),
    r11: Result<R11, E11> | (() => Result<R11, E11>),
    r12: Result<R12, E12> | (() => Result<R12, E12>)
  ): Result<
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12],
    E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12
  >;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    R8,
    R9,
    R10,
    R11,
    R12,
    R13,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error,
    E8 extends Error,
    E9 extends Error,
    E10 extends Error,
    E11 extends Error,
    E12 extends Error,
    E13 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>),
    r8: Result<R8, E8> | (() => Result<R8, E8>),
    r9: Result<R9, E9> | (() => Result<R9, E9>),
    r10: Result<R10, E10> | (() => Result<R10, E10>),
    r11: Result<R11, E11> | (() => Result<R11, E11>),
    r12: Result<R12, E12> | (() => Result<R12, E12>),
    r13: Result<R13, E13> | (() => Result<R13, E13>)
  ): Result<
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13],
    E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13
  >;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    R8,
    R9,
    R10,
    R11,
    R12,
    R13,
    R14,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error,
    E8 extends Error,
    E9 extends Error,
    E10 extends Error,
    E11 extends Error,
    E12 extends Error,
    E13 extends Error,
    E14 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>),
    r8: Result<R8, E8> | (() => Result<R8, E8>),
    r9: Result<R9, E9> | (() => Result<R9, E9>),
    r10: Result<R10, E10> | (() => Result<R10, E10>),
    r11: Result<R11, E11> | (() => Result<R11, E11>),
    r12: Result<R12, E12> | (() => Result<R12, E12>),
    r13: Result<R13, E13> | (() => Result<R13, E13>),
    r14: Result<R14, E14> | (() => Result<R14, E14>)
  ): Result<
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14],
    E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14
  >;
  public static combine<
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    R7,
    R8,
    R9,
    R10,
    R11,
    R12,
    R13,
    R14,
    R15,
    E1 extends Error,
    E2 extends Error,
    E3 extends Error,
    E4 extends Error,
    E5 extends Error,
    E6 extends Error,
    E7 extends Error,
    E8 extends Error,
    E9 extends Error,
    E10 extends Error,
    E11 extends Error,
    E12 extends Error,
    E13 extends Error,
    E14 extends Error,
    E15 extends Error
  >(
    r1: Result<R1, E1> | (() => Result<R1, E1>),
    r2: Result<R2, E2> | (() => Result<R2, E2>),
    r3: Result<R3, E3> | (() => Result<R3, E3>),
    r4: Result<R4, E4> | (() => Result<R4, E4>),
    r5: Result<R5, E5> | (() => Result<R5, E5>),
    r6: Result<R6, E6> | (() => Result<R6, E6>),
    r7: Result<R7, E7> | (() => Result<R7, E7>),
    r8: Result<R8, E8> | (() => Result<R8, E8>),
    r9: Result<R9, E9> | (() => Result<R9, E9>),
    r10: Result<R10, E10> | (() => Result<R10, E10>),
    r11: Result<R11, E11> | (() => Result<R11, E11>),
    r12: Result<R12, E12> | (() => Result<R12, E12>),
    r13: Result<R13, E13> | (() => Result<R13, E13>),
    r14: Result<R14, E14> | (() => Result<R14, E14>),
    r15: Result<R15, E15> | (() => Result<R15, E15>)
  ): Result<
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15],
    | E1
    | E2
    | E3
    | E4
    | E5
    | E6
    | E7
    | E8
    | E9
    | E10
    | E11
    | E12
    | E13
    | E14
    | E15
  >;
  public static combine<U, E extends Error>(
    ...results: Array<Result<U, E> | (() => Result<U, E>)>
  ): Result<U[], E>;
  public static combine<U, E extends Error>(
    ...results: Array<Result<U, E> | (() => Result<U, E>)>
  ): Result<U[], E> {
    const values: U[] = [];
    for (const item of results) {
      const result = typeof item === 'function' ? item() : item;
      if (!result.success) return this.fail(result.error);
      values.push(result.value);
    }
    return this.pass(values);
  }
}
