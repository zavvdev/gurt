import { errorReporter } from '~/infrastructure/errorReporter';

export function delay(ms: number) {
  return new Promise((res) => setTimeout(() => res(ms), ms));
}

export function reportAppError<T>(error: T) {
  errorReporter.report(error);
}
