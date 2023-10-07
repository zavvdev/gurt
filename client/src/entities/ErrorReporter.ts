export interface ErrorReporter {
  report<T>(error: T): void;
}
