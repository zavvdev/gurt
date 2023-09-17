import { useRouter } from 'next/navigation';
import { PUBLIC_ROUTES } from '~/routes';
import { useLogout } from '~/core/features/auth/logout';
import { User } from '~/presentation/pages/Home/User';

export function Home() {
  const logout = useLogout();
  const router = useRouter();

  return (
    <div>
      <div>Home</div>
      <User />
      <button className="link" onClick={() => logout.initiate()}>
        Logout
      </button>
      <br />
      <button
        className="link"
        onClick={() => router.push(PUBLIC_ROUTES.auth.forgotPassword())}
      >
        Change password
      </button>
    </div>
  );
}
