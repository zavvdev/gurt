import { ServerResponseMessage } from '~/infrastructure/serverApi/types';

export interface ResponseMessageEventHandlers {
  onError?: (message: ServerResponseMessage | null) => void;
  onSuccess?: (message: ServerResponseMessage | null) => void;
}
