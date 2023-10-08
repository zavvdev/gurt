import { errorReporter } from '~/infrastructure/errorReporter';

export function delay(ms: number) {
  return new Promise((res) => setTimeout(() => res(ms), ms));
}

export function reportCriticalAppError(error: unknown) {
  errorReporter.report({
    message: 'Application critical error',
    error,
  });
}
