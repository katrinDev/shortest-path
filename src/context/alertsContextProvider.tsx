import {
  AlertsContext,
  AlertsProviderProps,
  SnackbarProps,
} from "./alertsContext";
import { useState } from "react";

const AlertsProvider = ({ children, initialValue }: AlertsProviderProps) => {
  const [snackbarProps, setSnackbarProps] =
    useState<SnackbarProps>(initialValue);

  return (
    <AlertsContext.Provider value={{ snackbarProps, setSnackbarProps }}>
      {children}
    </AlertsContext.Provider>
  );
};

export { AlertsProvider };
