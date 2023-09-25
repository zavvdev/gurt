import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '~/presentation/shared/UINotificationContainer/UINotificationContainer.css';

export function UINotificationContainer() {
  return (
    <ToastContainer
      position="top-center"
      pauseOnFocusLoss={false}
      autoClose={3000}
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
