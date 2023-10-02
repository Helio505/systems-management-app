import { useEffect, useState } from "react";

type alertObjType = {
  isVisible: boolean;
  type: string;
  message: string;
  timer: number;
};

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

  // Toggle alert function
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
