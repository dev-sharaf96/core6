import { Error } from '.';

/** The common response model */
export class LookupsOutputResponse<T> {
  /** The result data */
  Result: T;
  /** The list of error models */
  ErrorDescription: string;
  ErrorCode:number;

  /** The total count of result from the source. */
}
