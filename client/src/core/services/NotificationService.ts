import { toast as Toast } from 'react-toastify';

type NotificationType = 'success' | 'error' | 'warn' | 'info';

export interface Notification {
  type: NotificationType;
  message: string;
}

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

  createNotification(type: NotificationType, message: string): Notification {
    return {
      type,
      message,
    };
  }

  show(notification: Notification): void {
    if (
      typeof notification.type === 'string' &&
      typeof this.repo?.[notification.type] === 'function' &&
      typeof notification.message === 'string'
    ) {
      this.repo[notification.type](notification.message);
    }
  }
}

export const notificationService = new NotificationService(Toast);
