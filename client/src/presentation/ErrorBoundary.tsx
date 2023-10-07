import { Component, PropsWithChildren } from 'react';
import { reportAppError } from '~/application/utilities/general';
import { AppError } from '~/presentation/pages/AppError';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    reportAppError({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return <AppError />;
    }

    return this.props.children;
  }
}
