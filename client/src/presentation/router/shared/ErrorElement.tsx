import { useRouteError } from 'react-router-dom';

export function ErrorElement(): JSX.Element {
  throw useRouteError();
}
