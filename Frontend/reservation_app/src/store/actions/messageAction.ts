import {
  HIDE_MESSAGE,
  MessagePayload,
  ShowMessageType,
  SHOW_MESSAGE,
} from "../types/MessageType";

export function showMessage(message: MessagePayload): ShowMessageType {
  return {
    payload: message,
    type: SHOW_MESSAGE,
  };
}

export function hideMessage(): ShowMessageType {
  return {
    type: HIDE_MESSAGE,
  };
}
