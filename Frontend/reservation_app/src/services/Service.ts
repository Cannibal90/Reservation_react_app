import { showMessage } from "../store/actions/messageAction";
import { store } from "../store/store";

export class Service {
  handleError = (text: string) => {
    if (!text) return Promise.reject();
    store.dispatch(showMessage({ message: text, type: "error" }));
  };
}
