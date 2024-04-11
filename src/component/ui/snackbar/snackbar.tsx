import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Snackbar, Alert, AlertProps, Grow } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export type AlertPropsSeverity = AlertProps["severity"];

export interface SnackbarRef {
  displaySnackbar: (message: string, severity?: AlertPropsSeverity) => void;
}

interface SnackbarProps {
  transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
  anchorOrigin: {
    horizontal: "center" | "left" | "right";
    vertical: "bottom" | "top";
  };
  duration: number;
  color: string;
}

const SnackbarUI = forwardRef<SnackbarRef>(
  (props: Partial<SnackbarProps>, ref) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertPropsSeverity>("info");

    const { color, transition, anchorOrigin, duration } = props;

    useImperativeHandle(ref, () => ({
      displaySnackbar: (message: string, severity?: AlertPropsSeverity) => {
        setMessage(message);
        setSeverity(severity ?? "info");
        setOpen(true);
      },
    }));

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Snackbar
        open={open}
        color={color ?? "#FFF"}
        TransitionComponent={transition ?? Grow}
        autoHideDuration={duration ?? 6000}
        anchorOrigin={
          anchorOrigin ?? { horizontal: "right", vertical: "top" }
        }
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
);

export default SnackbarUI;
