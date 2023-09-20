import { ServerResponseMessage } from '~/infrastructure/serverGateway/types';

export interface MutationEvents {
  onError?: (message: ServerResponseMessage | null) => void;
  onSuccess?: (message: ServerResponseMessage | null) => void;
}
