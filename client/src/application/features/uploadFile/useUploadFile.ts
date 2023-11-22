import { useMutation } from '@tanstack/react-query';
import { storageApi } from '~/infrastructure/serverApi/v1/storage/api';

interface Args {
  onError?: () => void;
}

export function useUploadFile(args?: Args) {
  const { mutateAsync, isLoading } = useMutation(
    async (file: object) => {
      const res = await storageApi.uploadFile({
        file,
      });
      return res.data;
    },
    {
      onError: () => {
        args?.onError?.();
      },
    },
  );

  return {
    initiate: mutateAsync,
    isLoading,
  };
}
