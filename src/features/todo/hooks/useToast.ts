import { toast } from 'react-toastify';

export function useToast() {
  const notify = (message: string, type: "info" | "success" | "warning" | "error" = "info", time: number = 5000) => {
    toast[type](message, {
      position: "top-right",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return { notify };
}
