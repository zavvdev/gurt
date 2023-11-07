import { useMutation } from '@tanstack/react-query';
import {
  ExtractedValidationError,
  ServerValidationErrorsResponse,
} from '~/infrastructure/serverApi/types';
import { extractValidationErrors } from '~/infrastructure/serverApi/utilities';
import { sessionUserApi } from '~/infrastructure/serverApi/v1/sessionUser/api';
import { dateService } from '~/application/services/DateService';
import { squashSpaces } from '~/application/utilities/general';

export interface UpdateForm {
  name: string | null;
  username: string | null;
  bio: string | null;
  country: string | null;
  dateOfBirth: Date | null;
}

interface UseUpdateSessionUserDataArgs {
  onError?: (validationErrors?: ExtractedValidationError[]) => void;
  onSuccess?: () => void;
}

export const BIO_MAX_LENGTH = 500;

export function useUpdateSessionUserData(args?: UseUpdateSessionUserDataArgs) {
  const { mutate, isLoading } = useMutation(
    (form: UpdateForm) => {
      return sessionUserApi.patch({
        name: form.name,
        username: form.username,
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
    initiate: mutate,
    isLoading,
  };
}
