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
import { squashSpaces } from '~/application/utilities/general';

export interface UpdateProfileForm {
  image: UploadFile | null;
  backgroundImage: UploadFile | null;
  name: string;
  username: string;
  bio: string | null;
  country: string | null;
  dateOfBirth: Date | null;
}

type UpdateUserData = Pick<UpdateProfileForm, 'name' | 'username'>;
type UpdateProfileData = Pick<
  UpdateProfileForm,
  'image' | 'backgroundImage' | 'bio' | 'country' | 'dateOfBirth'
>;

interface UseUpdateProfileArgs {
  onError?: (validationErrors?: ExtractedValidationError[]) => void;
  onSuccess?: () => void;
}

export const BIO_MAX_LENGTH = 500;

export function useUpdateProfile(args?: UseUpdateProfileArgs) {
  const updateUser = useMutation((form: UpdateUserData) => {
    return usersGateway.updatePublicDataFromSession({
      name: squashSpaces(form.name),
      username: squashSpaces(form.username),
    });
  });

  const updateProfile = useMutation((form: UpdateProfileData) => {
    return profilesGateway.updateFromSession({
      image: form.image?.originFileObj || form.image?.url || null,
      background_image:
        form.backgroundImage?.originFileObj ||
        form.backgroundImage?.url ||
        null,
      bio: form.bio ? squashSpaces(form.bio) : null,
      country: form.country,
      date_of_birth: form.dateOfBirth
        ? dateService.toServerDate(form.dateOfBirth)
        : null,
    });
  });

  const initiate = async (form: UpdateProfileForm) => {
    try {
      await updateUser.mutateAsync(form);
      await updateProfile.mutateAsync(form);
      args?.onSuccess?.();
    } catch (e) {
      args?.onError?.(
        extractValidationErrors(e as ServerValidationErrorsResponse),
      );
    }
  };

  return {
    initiate,
    isLoading: updateUser.isLoading || updateProfile.isLoading,
  };
}
