import '~/presentation/styles/globals.css';
import type { Metadata } from 'next';
import { METADATA } from '~/infrastructure/config/general';
import { RootLayout } from '~/presentation/layouts/Root/RootLayout.view';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = METADATA;
export default RootLayout;
