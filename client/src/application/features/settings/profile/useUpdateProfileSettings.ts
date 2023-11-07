import { useMutation } from '@tanstack/react-query';
import {
  ExtractedValidationError,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverApi/types';
import { sessionUserApi } from '~/infrastructure/serverApi/v1/sessionUser/api';
import { extractValidationErrors } from '~/infrastructure/serverApi/utilities';
import { ProfileSettingsForm } from '~/application/features/settings/profile/types';
import { squashSpaces } from '~/application/utilities/general';
import { dateService } from '~/application/services/DateService';

interface UseUpdateProfileSessionArgs {
  onError?: (validationErrors?: ExtractedValidationError[]) => void;
  onSuccess?: () => void;
}

export function useUpdateProfileSettings(args?: UseUpdateProfileSessionArgs) {
  const { mutate, isLoading } = useMutation(
    (form: ProfileSettingsForm) => {
      return sessionUserApi.patch({
        name: form.name,
        username: form.username,
        profile: {
          bio: form.bio ? squashSpaces(form.bio) : null,
          country: form.country,
          date_of_birth: form.dateOfBirth
            ? dateService.toServerDate(form.dateOfBirth)
            : null,
        },
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
    initiate: mutate,
    isLoading,
  };
}
