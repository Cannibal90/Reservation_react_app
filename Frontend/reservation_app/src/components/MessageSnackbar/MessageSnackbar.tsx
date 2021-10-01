import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { hideMessage } from "../../store/actions/messageAction";
import { store } from "../../store/store";

const MessageSnackbar = () => {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<AlertColor>("success");

  const onClose = () => {
    store.dispatch(hideMessage());
  };

  const isAlertColor = (type: string): AlertColor => {
    if (
      type === "success" ||
      type === "info" ||
      type === "warning" ||
      type === "error"
    )
      return type as AlertColor;
    else return "info" as AlertColor;
  };

  const onChange = () => {
    setMessage(store.getState().showMessageReducer.message);
    setShow(store.getState().showMessageReducer.shown);
    setType(isAlertColor(store.getState().showMessageReducer.type));
  };

  useEffect(() => {
    let sub = store.subscribe(onChange);
    return function clean() {
      sub();
    };
  });

  return (
    <>
      <Snackbar open={show} autoHideDuration={6000}>
        <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MessageSnackbar;
