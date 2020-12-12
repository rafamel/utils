export declare namespace Result {
  /* Definition */
  export type Box<S = any, F = any> = Success<S> | Failure<F>;
  export type Break<S = any, F = any> = Box<S, F> | null;
  export type Success<S = any> = { success: true; data: S };
  export type Failure<F = any> = { success: false; data: F };

  /* Utility */
  export type SuccessType<T extends Break> = T extends Success<infer S>
    ? S
    : never;
  export type FailureType<T extends Break> = T extends Failure<infer F>
    ? F
    : never;
}
