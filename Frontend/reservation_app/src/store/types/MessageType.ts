export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const HIDE_MESSAGE = "HIDE_MESSAGE";

export interface MessageState {
  shown: boolean;
  message: string;
  type: string;
}

export interface MessagePayload {
  message: string;
  type: string;
}

interface ShowMessage {
  type: typeof SHOW_MESSAGE;
  payload: MessagePayload;
}

interface HideMessage {
  type: typeof HIDE_MESSAGE;
}

export type ShowMessageType = ShowMessage | HideMessage;
