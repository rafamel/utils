import { Empty, UnaryFn } from 'type-core';
import { Create } from './Create';
import { Result } from './Result';

export declare namespace Operate {
  export type Fallback<T extends Result.Break, U> = T extends null
    ? Result.Box<Result.SuccessType<T> | U, Result.FailureType<T>>
    : Result.Box<Result.SuccessType<T>, Result.FailureType<T>>;
  export type Transform<T extends Result.Break, U> =
    | (T extends null ? null : never)
    | U;
  export type Map<
    T extends Result.Break,
    U extends UnaryFn<Result.SuccessType<T>, any> | Empty,
    V extends UnaryFn<Result.FailureType<T>, any> | Empty
  > =
    | Result.Box<never, never>
    | (T extends null ? null : never)
    | (U extends UnaryFn<Result.SuccessType<T>, infer SU>
        ? Result.Success<SU>
        : Result.Success<Result.SuccessType<T>>)
    | (V extends UnaryFn<Result.FailureType<T>, infer FV>
        ? Result.Failure<FV>
        : Result.Failure<Result.FailureType<T>>);
  export type Flip<
    T extends Result.Break,
    U extends boolean | Empty,
    V extends boolean | Empty
  > =
    | Result.Box<never, never>
    | (T extends null ? null : never)
    | (U extends true
        ? Result.Failure<Result.SuccessType<T>>
        : Result.Success<Result.SuccessType<T>>)
    | (V extends true
        ? Result.Success<Result.FailureType<T>>
        : Result.Failure<Result.FailureType<T>>);
}

export class Operate {
  /**
   * For an input of a *result* or `null`,
   * the returning function returns the *result* if not `null`,
   * or a successful *result* of `value` if `null`.
   */
  public static fallback<T extends Result.Break, U>(
    value: U
  ): UnaryFn<T, Operate.Fallback<T, U>> {
    return (result) => {
      return (result || Create.success(value)) as any;
    };
  }
  /**
   * Maps a *result* to their `data`, with optional
   * remaps for `data` upon a successful and/or failed *result.*
   */
  public static transform<
    T extends Result.Break,
    U = Result.SuccessType<T>,
    V = Result.FailureType<T>
  >(
    onSuccess?: UnaryFn<Result.SuccessType<T>, U> | Empty,
    onFailure?: UnaryFn<Result.FailureType<T>, V> | Empty
  ): UnaryFn<T, Operate.Transform<T, U | V>> {
    return (result): any => {
      if (!result) return result;
      if (result.success) {
        return onSuccess ? onSuccess(result.data) : result.data;
      } else {
        return onFailure ? onFailure(result.data) : result.data;
      }
    };
  }
  /**
   * Maps a *result* to a *result* with different `data` values.
   */
  public static map<
    T extends Result.Break,
    U extends UnaryFn<Result.SuccessType<T>, any> | Empty,
    V extends UnaryFn<Result.FailureType<T>, any> | Empty
  >(onSuccess?: U, onFailure?: V): UnaryFn<T, Operate.Map<T, U, V>> {
    return (result): any => {
      if (!result) return result;
      if (result.success) {
        return onSuccess ? Create.success(onSuccess(result.data)) : result;
      } else {
        return onFailure ? Create.failure(onFailure(result.data)) : result;
      }
    };
  }
  /**
   * Allows to optionally convert an input successful *result* into a
   * failed *Result* with the same `data`, and vice-versa.
   * @param onSuccess whether to flip a successful *result* to a failed *result*
   * @param onFailure whether to flip a failed *result* to a successful *result*
   */
  public static flip<
    T extends Result.Break,
    U extends boolean | Empty,
    V extends boolean | Empty
  >(onSuccess?: U, onFailure?: V): UnaryFn<T, Operate.Flip<T, U, V>> {
    return (result): any => {
      if (!result) return result;
      if (result.success) {
        return onSuccess ? Create.failure(result.data) : result;
      } else {
        return onFailure ? Create.success(result.data) : result;
      }
    };
  }
  /**
   * Allows for the execution of side effects upon
   * a successful or failed *result.*
   */
  public static tap<T extends Result.Break>(
    onSuccess?: UnaryFn<Result.SuccessType<T>> | Empty,
    onFailure?: UnaryFn<Result.FailureType<T>> | Empty
  ): UnaryFn<T, T> {
    return (result) => {
      if (result) {
        if (result.success) {
          if (onSuccess) onSuccess(result.data);
        } else {
          if (onFailure) onFailure(result.data);
        }
      }
      return result;
    };
  }
}
