// TODO: Replace console with some service like Sentry

export interface ReportError<T = unknown> {
  message?: string;
  location?: string;
  error: T;
}

class ErrorReporter {
  private repo;

  constructor(repo: Console) {
    this.repo = repo;
  }

  public report<T = unknown>(error: ReportError<T>): void {
    const errorToReport = {
      message: error.message || null,
      location: error.location || null,
      error: error.error,
    };
    if (import.meta.env.DEV) {
      console.error(errorToReport);
    }
    this.repo.error(errorToReport);
  }
}

export const errorReporter = new ErrorReporter(console);
