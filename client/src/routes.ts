export const PUBLIC_ROUTES = {
  auth: {
    login: () => '/login',
    register: () => '/register',
    forgotPassword: () => '/forgot-password',
    resetPassword: () => '/reset-password',
  },
};

export const PRIVATE_ROUTES = {
  home: () => '/home',
  verifyEmail: () => '/verify-email',
};
