import { notification } from "antd";

type NotificationType = "success" | "warning" | "error" | "info";

const useNotification = () => {
  const showNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    notification[type]({
      message,
      description,
    });
  };

  return showNotification;
};

export default useNotification;
