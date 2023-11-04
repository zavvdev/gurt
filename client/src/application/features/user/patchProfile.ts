import { useMutation } from '@tanstack/react-query';
import { UploadFile } from 'antd';
import {
  ExtractedValidationError,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverGateway/types';
import { extractValidationErrors } from '~/infrastructure/serverGateway/utilities';
import { usersGateway } from '~/infrastructure/serverGateway/v1/users/gateway';

export interface PatchProfileForm {
  image: UploadFile | null;
  backgroundImage: UploadFile | null;
  name: string;
  username: string;
  bio: string | null;
  country: string | null;
  dateOfBirth: string | null;
}

type PatchUserData = Pick<PatchProfileForm, 'name' | 'username'>;

interface UsePatchProfileArgs {
  onError?: (validationErrors?: ExtractedValidationError[]) => void;
  onSuccess?: () => void;
}

export function usePatchProfile(args?: UsePatchProfileArgs) {
  const patchUser = useMutation((form: PatchUserData) => {
    return usersGateway.patchPublicDataFromSession(form);
  });

  const initiate = async (form: PatchProfileForm) => {
    try {
      await patchUser.mutateAsync({
        name: form.name,
        username: form.username,
      });
      args?.onSuccess?.();
    } catch (e) {
      args?.onError?.(
        extractValidationErrors(e as ServerValidationErrorsResponse),
      );
    }
  };

  return {
    initiate,
    isLoading: patchUser.isLoading,
  };
}
