import { useEffect, useState } from "react";

type alertObjType = {
  isVisible: boolean;
  type: string;
  message: string;
  timer: number;
};

/**
 * Custom hook to handle alerts.
 * @example const { alertObj, activateAlert } = useAlert();
 * activateAlert("success", "Usuário cadastrado com sucesso!"); // exemplo:
 */
const useAlert = () => {
  // State:
  const [alertObj, setAlertObj] = useState<alertObjType>({
    isVisible: false,
    type: "light",
    message: "default message",
    timer: 2000,
  });

  // Deactivate alert function
  const deactivateAlert = () => {
    setAlertObj({
      isVisible: false,
      type: "light",
      message: "default message",
      timer: 2000,
    });
  };

  /**
   * Toggle alert function.
   * @param type The color of the alert. Follows the predefined bootstrap colors.
   * @param message The message to be displayed.
   * @param timer The time in milliseconds, after witch the alert will be hidden.
   */
  const activateAlert = (
    type: string,
    message: string,
    timer: number = 2000
  ) => {
    setAlertObj({
      isVisible: true,
      type: type,
      message: message,
      timer: timer,
    });
  };

  // Timer for alert:
  useEffect(() => {
    if (alertObj.isVisible) {
      const alertTimeout = setTimeout(() => {
        // Ocultando alerta, e limpando state.
        deactivateAlert();
      }, alertObj.timer);
      return () => clearTimeout(alertTimeout);
    }
  }, [alertObj.isVisible]);

  return {
    alertObj,
    activateAlert,
    deactivateAlert,
  };
};
export default useAlert;

// Exemplo de uso:
// No componente:
// const { alertObj, activateAlert } = useAlert();
// activateAlert("success", "Usuário cadastrado com sucesso!"); // exemplo:
// No jsx:
// <Alert isOpen={alertObj.isVisible} color={alertObj.type}>
// {alertObj.message}
// </Alert>
