import { Result } from './Result';

export type CreateResult<T, E extends Error = Error> = [T] extends [never]
  ? Result<unknown>
  : T extends Promise<never>
  ? Promise<Result<unknown>>
  : T extends Promise<infer U>
  ? Promise<Result<U, E>>
  : Result<T, E>;
