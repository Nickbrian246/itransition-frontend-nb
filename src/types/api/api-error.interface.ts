export interface ErrorResponse<T> {
  statusCode: number;
  message: T;
}
