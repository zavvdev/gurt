import { toast as Toast } from 'react-toastify';

class NotificationService {
  private repo;

  constructor(toast: typeof Toast) {
    this.repo = toast;
  }

  success(message: string): void {
    this.repo.success(message);
  }

  error(message: string): void {
    this.repo.error(message);
  }

  warn(message: string): void {
    this.repo.warn(message);
  }

  info(message: string): void {
    this.repo.info(message);
  }
}

export const notificationService = new NotificationService(Toast);
