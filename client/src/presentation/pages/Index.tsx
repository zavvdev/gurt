import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { PRIVATE_ROUTES } from '~/routes';

export function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({
      to: PRIVATE_ROUTES.home(),
    });
  }, [navigate]);
  return null;
}
