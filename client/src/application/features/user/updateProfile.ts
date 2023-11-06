import { useMutation } from '@tanstack/react-query';
import {
  ExtractedValidationError,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverApi/types';
import { extractValidationErrors } from '~/infrastructure/serverApi/utilities';
import { profilesApi } from '~/infrastructure/serverApi/v1/profiles/api';
import { dateService } from '~/application/services/DateService';
import { squashSpaces } from '~/application/utilities/general';

export interface UpdateProfileForm {
  bio: string | null;
  country: string | null;
  dateOfBirth: Date | null;
}

interface UseUpdateProfileArgs {
  onError?: (validationErrors?: ExtractedValidationError[]) => void;
  onSuccess?: () => void;
}

export const BIO_MAX_LENGTH = 500;

export function useUpdateProfile(args?: UseUpdateProfileArgs) {
  const updateProfile = useMutation(
    (form: UpdateProfileForm) => {
      return profilesApi.patchMe({
        bio: form.bio ? squashSpaces(form.bio) : null,
        country: form.country,
        date_of_birth: form.dateOfBirth
          ? dateService.toServerDate(form.dateOfBirth)
          : null,
      });
    },
    {
      onSuccess: () => {
        args?.onSuccess?.();
      },
      onError: (e) => {
        args?.onError?.(
          extractValidationErrors(e as ServerValidationErrorsResponse),
        );
      },
    },
  );

  return {
    initiate: updateProfile.mutate,
    isLoading: updateProfile.isLoading,
  };
}
