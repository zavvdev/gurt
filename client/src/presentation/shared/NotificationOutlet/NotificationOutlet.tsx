import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '~/presentation/shared/NotificationOutlet/NotificationOutlet.css';

export function NotificationOutlet() {
  return (
    <ToastContainer
      position="top-center"
      pauseOnFocusLoss={false}
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="colored"
      icon={false}
    />
  );
}
