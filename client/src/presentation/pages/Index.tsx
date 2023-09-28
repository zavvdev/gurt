import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTES } from '~/routes';

export function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(PRIVATE_ROUTES.home());
  }, [navigate]);
  return null;
}
