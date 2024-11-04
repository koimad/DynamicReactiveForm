import { ApiError } from './ApiError';
import { HttpStatusCode } from './HttpStatusCode';

export class ApiResponse {
  public statusCode?: HttpStatusCode;

  public message?: string | undefined;

  public isError?: boolean;

  public responseException?: ApiError;

  public result?: unknown | undefined;
}
