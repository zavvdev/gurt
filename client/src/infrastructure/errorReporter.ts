import { ErrorReporter as ErrorReporterEntity } from '~/entities/ErrorReporter';

// TODO: Replace console with some service like Sentry

class ErrorReporter implements ErrorReporterEntity {
  private repo;

  constructor(repo: Console) {
    this.repo = repo;
  }

  public report<T>(error: T): void {
    this.repo.error(error);
  }
}

export const errorReporter = new ErrorReporter(console);
