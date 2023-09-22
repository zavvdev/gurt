import { useLogout } from '~/core/features/auth/logout';
import { User } from '~/presentation/pages/Home/User';

export function Home() {
  const logout = useLogout();

  return (
    <div>
      <div>Home</div>
      <User />
      <button onClick={() => logout.initiate()}>Logout</button>
    </div>
  );
}
