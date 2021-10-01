import {
  HIDE_MESSAGE,
  MessageState,
  ShowMessageType,
  SHOW_MESSAGE,
} from "../types/MessageType";

const initialState: MessageState = {
  shown: false,
  message: "",
  type: "succes",
};

export function showMessageReducer(
  state = initialState,
  action: ShowMessageType
): MessageState {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        shown: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    case HIDE_MESSAGE:
      return {
        shown: false,
        message: "",
        type: "succes",
      };
    default:
      return state;
  }
}
