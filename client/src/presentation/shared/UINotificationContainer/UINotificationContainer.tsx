import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '~/presentation/shared/UINotificationContainer/UINotificationContainer.css';

export function UINotificationContainer() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      icon={false}
    />
  );
}
