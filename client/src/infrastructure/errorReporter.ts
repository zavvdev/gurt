// TODO: Replace console with some service like Sentry

class ErrorReporter {
  private repo;

  constructor(repo: Console) {
    this.repo = repo;
  }

  public report<T>(error: T): void {
    if (import.meta.env.DEV) {
      console.error(error);
    }
    this.repo.error(error);
  }
}

export const errorReporter = new ErrorReporter(console);
