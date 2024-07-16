export declare namespace Result {
  /** A successful or failed result */
  export type Box<S = any, F = any> = Success<S> | Failure<F>;
  /** A successful result, failed result, or `null` */
  export type Break<S = any, F = any> = Box<S, F> | null;
  /** A successful result */
  export type Success<S = any> = { success: true; data: S };
  /** A failed result */
  export type Failure<F = any> = { success: false; data: F };

  /* Utility */
  export type SuccessType<T extends Break> =
    T extends Success<infer S> ? S : never;
  export type FailureType<T extends Break> =
    T extends Failure<infer F> ? F : never;
}
