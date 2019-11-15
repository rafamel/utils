/* eslint-disable no-dupe-class-members */
import { symbol, ResultInternal } from './internal';
import { isPromise } from 'promist';

export class Result<T = any, S extends boolean = boolean> {
  private [symbol]: ResultInternal<T, S>;
  private constructor(success: S, error?: Error, value?: T) {
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
  public get error(): Error {
    const internal = this[symbol];
    if (internal.success) {
      throw Error(`Can't get error of a successful result`);
    }
    return internal.error as Error;
  }
  public static pass<U = void>(value?: U): Result<U, true> {
    return new Result(true, undefined, value || undefined);
  }
  public static fail(error?: Error | string): Result<any, false> {
    const err = typeof error === 'string' ? Error(error) : error;
    return new Result(false, err || Error(`Explicit operation failure`));
  }
  public static create(fn: () => never): Result;
  public static create<T>(fn: () => Promise<T>): Promise<Result<T>>;
  public static create<T>(fn: () => T): Result<T>;
  public static create<T>(
    fn: () => Promise<T> | T
  ): Promise<Result<T>> | Result<T>;
  public static create<T>(
    fn: () => Promise<T> | T
  ): Promise<Result<T>> | Result<T> {
    try {
      const value = fn();
      return isPromise(value)
        ? value
            .then((value) => Result.pass(value))
            .catch((err) => Result.fail(err))
        : Result.pass(value);
    } catch (err) {
      return Result.fail(err);
    }
  }
  public static combine<R1>(r1: Result<R1>): Result<[R1]>;
  public static combine<R1, R2>(
    r1: Result<R1>,
    r2: Result<R2>
  ): Result<[R1, R2]>;
  public static combine<R1, R2, R3>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>
  ): Result<[R1, R2, R3]>;
  public static combine<R1, R2, R3, R4>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>
  ): Result<[R1, R2, R3, R4]>;
  public static combine<R1, R2, R3, R4, R5>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>
  ): Result<[R1, R2, R3, R4, R5]>;
  public static combine<R1, R2, R3, R4, R5, R6>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>
  ): Result<[R1, R2, R3, R4, R5, R6]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>
  ): Result<[R1, R2, R3, R4, R5, R6, R7]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>,
    r8: Result<R8>
  ): Result<[R1, R2, R3, R4, R5, R6, R7, R8]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>,
    r8: Result<R8>,
    r9: Result<R9>
  ): Result<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>,
    r8: Result<R8>,
    r9: Result<R9>,
    r10: Result<R10>
  ): Result<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>,
    r8: Result<R8>,
    r9: Result<R9>,
    r10: Result<R10>,
    r11: Result<R11>
  ): Result<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>,
    r8: Result<R8>,
    r9: Result<R9>,
    r10: Result<R10>,
    r11: Result<R11>,
    r12: Result<R12>
  ): Result<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>,
    r8: Result<R8>,
    r9: Result<R9>,
    r10: Result<R10>,
    r11: Result<R11>,
    r12: Result<R12>,
    r13: Result<R13>
  ): Result<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>;
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
    R14
  >(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>,
    r8: Result<R8>,
    r9: Result<R9>,
    r10: Result<R10>,
    r11: Result<R11>,
    r12: Result<R12>,
    r13: Result<R13>,
    r14: Result<R14>
  ): Result<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>;
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
    R15
  >(
    r1: Result<R1>,
    r2: Result<R2>,
    r3: Result<R3>,
    r4: Result<R4>,
    r5: Result<R5>,
    r6: Result<R6>,
    r7: Result<R7>,
    r8: Result<R8>,
    r9: Result<R9>,
    r10: Result<R10>,
    r11: Result<R11>,
    r12: Result<R12>,
    r13: Result<R13>,
    r14: Result<R14>,
    r15: Result<R15>
  ): Result<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>;
  public static combine<U>(...results: Array<Result<U>>): Result<U[]>;
  public static combine<U>(...results: Array<Result<U>>): Result<U[]> {
    const values: U[] = [];
    for (const result of results) {
      if (!result.success) return this.fail(result.error);
      values.push(result.value);
    }
    return this.pass(values);
  }
}
