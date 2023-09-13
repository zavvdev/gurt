import { useThemeSwitch } from '~/presentation/widgets/ThemeSwitch/hooks/useThemeSwitch';

export function UserLayout({ children }: { children: React.ReactNode }) {
  useThemeSwitch();

  return (
    <div>
      <div>User layout</div>
      {children}
    </div>
  );
}
