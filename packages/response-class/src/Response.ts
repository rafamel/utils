/* eslint-disable no-dupe-class-members */
import { symbol, ResponseInternal } from './internal';

export class Response<T> {
  private [symbol]: ResponseInternal<T>;
  private constructor(success: boolean, error?: Error, value?: T) {
    /* istanbul ignore next */
    if (success && error) {
      throw Error(`Response can't succeed and contain an error`);
    } else if (!success && !error) {
      throw Error(`Response can't fail and lack an error`);
    }

    this[symbol] = { success, error, value };
  }
  public get success(): boolean {
    return this[symbol].success;
  }
  public get value(): T {
    const internal = this[symbol];
    if (!internal.success) {
      throw Error(`Can't get value of an unsuccessful response`);
    }
    return internal.value as T;
  }
  public get error(): Error {
    const internal = this[symbol];
    if (internal.success) {
      throw Error(`Can't get error of a successful response`);
    }
    return internal.error as Error;
  }

  public static pass<U>(value: U): Response<U> {
    return new Response<U>(true, undefined, value);
  }
  public static fail<U>(error: Error): Response<U> {
    return new Response<U>(false, error);
  }
  public static combine<R1>(r1: Response<R1>): Response<[R1]>;
  public static combine<R1, R2>(
    r1: Response<R1>,
    r2: Response<R2>
  ): Response<[R1, R2]>;
  public static combine<R1, R2, R3>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>
  ): Response<[R1, R2, R3]>;
  public static combine<R1, R2, R3, R4>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>
  ): Response<[R1, R2, R3, R4]>;
  public static combine<R1, R2, R3, R4, R5>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>
  ): Response<[R1, R2, R3, R4, R5]>;
  public static combine<R1, R2, R3, R4, R5, R6>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>
  ): Response<[R1, R2, R3, R4, R5, R6]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>
  ): Response<[R1, R2, R3, R4, R5, R6, R7]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>,
    r8: Response<R8>
  ): Response<[R1, R2, R3, R4, R5, R6, R7, R8]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>,
    r8: Response<R8>,
    r9: Response<R9>
  ): Response<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>,
    r8: Response<R8>,
    r9: Response<R9>,
    r10: Response<R10>
  ): Response<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>,
    r8: Response<R8>,
    r9: Response<R9>,
    r10: Response<R10>,
    r11: Response<R11>
  ): Response<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>,
    r8: Response<R8>,
    r9: Response<R9>,
    r10: Response<R10>,
    r11: Response<R11>,
    r12: Response<R12>
  ): Response<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>;
  public static combine<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>,
    r8: Response<R8>,
    r9: Response<R9>,
    r10: Response<R10>,
    r11: Response<R11>,
    r12: Response<R12>,
    r13: Response<R13>
  ): Response<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>;
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
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>,
    r8: Response<R8>,
    r9: Response<R9>,
    r10: Response<R10>,
    r11: Response<R11>,
    r12: Response<R12>,
    r13: Response<R13>,
    r14: Response<R14>
  ): Response<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>;
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
    r1: Response<R1>,
    r2: Response<R2>,
    r3: Response<R3>,
    r4: Response<R4>,
    r5: Response<R5>,
    r6: Response<R6>,
    r7: Response<R7>,
    r8: Response<R8>,
    r9: Response<R9>,
    r10: Response<R10>,
    r11: Response<R11>,
    r12: Response<R12>,
    r13: Response<R13>,
    r14: Response<R14>,
    r15: Response<R15>
  ): Response<
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]
  >;
  public static combine<U>(...responses: Array<Response<U>>): Response<U[]>;
  public static combine<U>(...responses: Array<Response<U>>): Response<U[]> {
    const values: U[] = [];
    for (const response of responses) {
      if (!response.success) return Response.fail(response.error);
      values.push(response.value);
    }
    return Response.pass(values);
  }
}
