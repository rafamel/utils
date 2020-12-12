import { Push } from 'multitude/definitions';
import { MaybePromiseLike, TypeGuard } from 'type-core';
import { Result } from './Result';

export declare namespace Consume {
  export type Result<T extends Result.Break> = T extends null
    ? null
    : Result.SuccessType<T>;
}

export class Consume {
  /**
   * Consumes a *result.* When successful, it will return its `data` field,
   * and otherwise throw an *Error.*
   */
  public static result<T extends Result.Break>(result: T): Consume.Result<T> {
    if (!result) return result as Consume.Result<T>;
    if (result.success) {
      return result.data;
    } else {
      const error = result.data;
      if (error instanceof Error) throw error;

      let str: any;
      try {
        str = TypeGuard.isObject(error) ? JSON.stringify(error) : String(error);
      } catch (_) {
        str = String(error);
      }
      throw Error(`Result failed with ${typeof error}: ` + str);
    }
  }
  /**
   * Consumes a *Promise* of a *result.* If successful,
   * it will return a *Promise* resolving with its `data` field,
   * and otherwise reject with an *Error.*
   */
  public static async promise<T extends Result.Break>(
    promise: MaybePromiseLike<T>
  ): Promise<Consume.Result<T>> {
    return Consume.result(await Promise.resolve(promise));
  }
  /**
   * Consumes an *Observable* of *result.*
   * Returns an *Observable* that will emit values of
   * the *result* `data` field as long as they're successful,
   * and otherwise error with an *Error*.
   * @param Constructor an ES Observable constructor
   * @param observable an ES Observable of *result*
   */
  public static observable<T extends Result.Break>(
    Constructor: Push.LikeConstructor,
    observable: Push.Like<T>
  ): Push.Like<Consume.Result<T>> {
    return new Constructor((obs) => {
      let unsubscribe = false;
      let subs: any;
      const subscription = (observable as any).subscribe({
        start(subscription: any) {
          subs = subscription;
        },
        next(result: Result.Break<T>) {
          if (unsubscribe) return;

          let value: any;
          let error: void | [Error];
          try {
            value = Consume.result(result);
          } catch (err) {
            error = [err];
          }
          if (!error) {
            obs.next(value);
          } else {
            obs.error(error[0]);
            if (typeof subs !== 'undefined') {
              subs.unsubscribe();
            } else if (typeof subscription !== 'undefined') {
              subscription.unsubscribe();
            } else {
              unsubscribe = true;
            }
          }
        },
        error(reason: Error) {
          obs.error(reason);
        },
        complete() {
          obs.complete();
        }
      });

      if (unsubscribe) subscription.unsubscribe();
      return () => subscription.unsubscribe();
    });
  }
}
