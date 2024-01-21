import { notification } from "antd";

type NotificationType = "success" | "warning" | "error" | "info";

const useNotification = () => {
  const showNotification = (
    type: NotificationType,
    message: string,
    description: string,
    duration?: number | null
  ) => {
    notification[type]({
      message,
      description,
      duration,
    });
  };

  return showNotification;
};

export default useNotification;
