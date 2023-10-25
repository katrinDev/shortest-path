import { Color } from "@material-ui/lab";
import { createContext, useState } from "react";

export type SnackbarProps = {
  open: boolean;
  severity: Color | undefined;
  message: string;
};

type AlertsContextType = {
  snackbarProps: SnackbarProps;
  setSnackbarProps: React.Dispatch<React.SetStateAction<SnackbarProps>>;
};

export type AlertsProviderProps = {
  children: React.ReactNode;
  initialValue: SnackbarProps;
};

export const AlertsContext = createContext<AlertsContextType>({
  snackbarProps: {
    open: false,
    severity: "error",
    message: "",
  },
  setSnackbarProps: () => {},
});
