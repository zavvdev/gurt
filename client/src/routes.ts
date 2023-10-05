export const PUBLIC_ROUTES = {
  auth: {
    login: () => '/login',

    register: () => '/register',

    forgotPassword: () => '/forgot-password',

    resetPassword: (token: string = ':token') => `/reset-password/${token}`,
  },
};

export const PRIVATE_ROUTES = {
  home: () => '/home',

  resendVerifyEmail: () => '/verify-email',

  verifyEmail: (
    args: { id: string; hash: string } = {
      id: ':id',
      hash: ':hash',
    },
  ) => `/verify-email/${args.id}/${args.hash}`,

  profile: () => '/profile',

  userProfile: (id: string | number = ':id') => `/user/${id}`,

  settings: {
    root: () => '/settings',
    app: () => '/settings/application',
    profile: () => '/settings/profile',
  },
};

export const ROUTE_AFTER_AUTH = PRIVATE_ROUTES.profile();
