import {
  MaybePromiseLike,
  Dictionary,
  ValueOf,
  NullaryFn,
  TypeGuard
} from 'type-core';
import { Push } from 'multitude';

import { Result } from './Result';

export declare namespace Create {
  export type CombineSuccessType<T extends Dictionary<Result.Break>> = {
    [P in keyof T]: Result.SuccessType<T[P]>;
  };
  export type CombineFailureType<T extends Dictionary<Result.Break>> = ValueOf<{
    [P in keyof T]: Result.FailureType<T[P]>;
  }>;
}

export class Create {
  /**
   * Creates a successful *result* with `data`.
   */
  public static success<S>(data: S): Result.Success<S> {
    return { success: true, data };
  }
  /**
   * Creates a failed *result* with `data`.
   */
  public static failure<F>(data: F): Result.Failure<F> {
    return { success: false, data };
  }
  /**
   * Creates a *result* that will be successful and contain the
   * return value of `fn` as `data`, or otherwise be failed if
   * `fn` throws.
   */
  public static execute<S>(fn: NullaryFn<S>): Result.Box<S, Error> {
    try {
      const value = fn();
      return Create.success(value);
    } catch (err) {
      return Create.failure(err as Error);
    }
  }
  /**
   * Returns a *Promise* of a *result,* that will be successful if `promise`
   * resolves, and failed otherwise.
   * @param promise a promise or a promise returning function
   */
  public static async promise<S>(
    promise: MaybePromiseLike<S> | NullaryFn<MaybePromiseLike<S>>
  ): Promise<Result.Box<S, Error>> {
    try {
      const value = await (TypeGuard.isFunction(promise) ? promise() : promise);
      return Create.success(value);
    } catch (err) {
      return Create.failure(err as Error);
    }
  }
  /**
   * Returns an *Observable* of *result,* that will be successful
   * as long as the original `observable` doesn't error, and failed otherwise.
   * @param Constructor an ES Observable constructor
   * @param observable an ES Observable
   * @param completeOnFail whether the resulting observable should complete after a failed *result*
   */
  public static observable<S>(
    Constructor: Push.LikeConstructor,
    observable: Push.Like<S>,
    completeOnFail?: boolean
  ): Push.Like<Result.Box<S, Error>> {
    return new Constructor((obs) => {
      const subscription = observable.subscribe({
        next(value) {
          obs.next(Create.success(value));
        },
        error(error) {
          obs.next(Create.failure(error));
          if (completeOnFail) return obs.complete();
        },
        complete() {
          obs.complete();
        }
      });
      return () => subscription.unsubscribe();
    });
  }
  public static combine<T extends Dictionary<Result.Box>>(
    members: T
  ): Result.Box<Create.CombineSuccessType<T>, Create.CombineFailureType<T>>;
  public static combine<T extends Dictionary<Result.Break>>(
    members: T
  ): Result.Break<Create.CombineSuccessType<T>, Create.CombineFailureType<T>>;
  public static combine<SA, FA>(
    results: [Result.Box<SA, FA>]
  ): Result.Box<[SA], FA>;
  public static combine<SA, FA>(
    results: [Result.Break<SA, FA>]
  ): Result.Break<[SA], FA>;
  public static combine<SA, FA, SB, FB>(
    results: [Result.Box<SA, FB>, Result.Box<SB, FB>]
  ): Result.Box<[SA, SB], FA | FB>;
  public static combine<SA, FA, SB, FB>(
    results: [Result.Break<SA, FB>, Result.Break<SB, FB>]
  ): Result.Break<[SA, SB], FA | FB>;
  public static combine<SA, FA, SB, FB, SC, FC>(
    results: [Result.Box<SA, FA>, Result.Box<SB, FB>, Result.Box<SC, FC>]
  ): Result.Box<[SA, SB, SC], FA | FB | FC>;
  public static combine<SA, FA, SB, FB, SC, FC>(
    results: [Result.Break<SA, FA>, Result.Break<SB, FB>, Result.Break<SC, FC>]
  ): Result.Break<[SA, SB, SC], FA | FB | FC>;
  public static combine<SA, FA, SB, FB, SC, FC, SD, FD>(
    results: [
      Result.Box<SA, FA>,
      Result.Box<SB, FB>,
      Result.Box<SC, FC>,
      Result.Box<SD, FD>
    ]
  ): Result.Box<[SA, SA, SC, SD], FA | FB | FC | FD>;
  public static combine<SA, FA, SB, FB, SC, FC, SD, FD>(
    results: [
      Result.Break<SA, FA>,
      Result.Break<SB, FB>,
      Result.Break<SC, FC>,
      Result.Break<SD, FD>
    ]
  ): Result.Break<[SA, SA, SC, SD], FA | FB | FC | FD>;
  public static combine<SA, FA, SB, FB, SC, FC, SD, FD, SE, FE>(
    results: [
      Result.Box<SA, FA>,
      Result.Box<SB, FB>,
      Result.Box<SC, FC>,
      Result.Box<SD, FD>,
      Result.Box<SE, FE>
    ]
  ): Result.Box<[SA, SA, SC, SD, SE], FA | FB | FC | FD | FE>;
  public static combine<SA, FA, SB, FB, SC, FC, SD, FD, SE, FE>(
    results: [
      Result.Break<SA, FA>,
      Result.Break<SB, FB>,
      Result.Break<SC, FC>,
      Result.Break<SD, FD>,
      Result.Break<SE, FE>
    ]
  ): Result.Break<[SA, SA, SC, SD, SE], FA | FB | FC | FD | FE>;
  public static combine<SA, FA, SB, FB, SC, FC, SD, FD, SE, FE, SF, FF>(
    results: [
      Result.Box<SA, FA>,
      Result.Box<SB, FB>,
      Result.Box<SC, FC>,
      Result.Box<SD, FD>,
      Result.Box<SE, FE>,
      Result.Box<SF, FF>
    ]
  ): Result.Box<[SA, SA, SC, SD, SE, SF], FA | FB | FC | FD | FE | FF>;
  public static combine<SA, FA, SB, FB, SC, FC, SD, FD, SE, FE, SF, FF>(
    results: [
      Result.Break<SA, FA>,
      Result.Break<SB, FB>,
      Result.Break<SC, FC>,
      Result.Break<SD, FD>,
      Result.Break<SE, FE>,
      Result.Break<SF, FF>
    ]
  ): Result.Break<[SA, SA, SC, SD, SE, SF], FA | FB | FC | FD | FE | FF>;
  public static combine<S, F>(
    observables: Array<Result.Box<S, F>>
  ): Result.Box<S[], F>;
  public static combine<S, F>(
    observables: Array<Result.Break<S, F>>
  ): Result.Break<S[], F>;
  /**
   * Combines multiple results. Takes either a record or an
   * array of *result.*
   * Returns a *result* that will be failed if any of the
   * input results fail, otherwise return `null` if any of the
   * inputs are `null`, or succeed with `data` of a
   * record or array of the result's `data` fields.
   */
  public static combine(
    results: Dictionary<Result.Break> | Result.Break[]
  ): Result.Break {
    if (TypeGuard.isArray(results)) {
      const data: any[] = [];

      let isNull = false;
      for (const result of results) {
        if (!result) isNull = true;
        else if (result.success) data.push(result.data);
        else return result;
      }

      return isNull ? null : Create.success(data);
    } else {
      const data: any = {};

      let isNull = false;
      for (const [key, result] of Object.entries(results)) {
        if (!result) isNull = true;
        else if (result.success) data[key] = result.data;
        else return result;
      }

      return isNull ? null : Create.success(data);
    }
  }
}
