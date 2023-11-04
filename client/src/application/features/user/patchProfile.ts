import { useMutation } from '@tanstack/react-query';
import { UploadFile } from 'antd';
import {
  ExtractedValidationError,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverGateway/types';
import { extractValidationErrors } from '~/infrastructure/serverGateway/utilities';
import { profilesGateway } from '~/infrastructure/serverGateway/v1/profiles/gateway';
import { usersGateway } from '~/infrastructure/serverGateway/v1/users/gateway';
import { dateService } from '~/application/services/DateService';

export interface PatchProfileForm {
  image: UploadFile | null;
  backgroundImage: UploadFile | null;
  name: string;
  username: string;
  bio: string | null;
  country: string | null;
  dateOfBirth: Date | null;
}

type PatchUserData = Pick<PatchProfileForm, 'name' | 'username'>;
type PatchProfileData = Pick<
  PatchProfileForm,
  'image' | 'backgroundImage' | 'bio' | 'country' | 'dateOfBirth'
>;

interface UsePatchProfileArgs {
  onError?: (validationErrors?: ExtractedValidationError[]) => void;
  onSuccess?: () => void;
}

export const BIO_MAX_LENGTH = 500;

export function usePatchProfile(args?: UsePatchProfileArgs) {
  const patchUser = useMutation((form: PatchUserData) => {
    return usersGateway.patchPublicDataFromSession({
      name: form.name,
      username: form.username,
    });
  });

  const patchProfile = useMutation((form: PatchProfileData) => {
    return profilesGateway.patchFromSession({
      image: form.image,
      background_image: form.backgroundImage,
      bio: form.bio,
      country: form.country,
      date_of_birth: form.dateOfBirth
        ? dateService.toServerDate(form.dateOfBirth)
        : null,
    });
  });

  const initiate = async (form: PatchProfileForm) => {
    try {
      await patchUser.mutateAsync(form);
      await patchProfile.mutateAsync(form);
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
