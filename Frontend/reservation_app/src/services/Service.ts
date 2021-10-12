import { showMessage } from "../store/actions/messageAction";
import { store } from "../store/store";

export class Service {
  handleError = (text: string) => {
    if (!text) return Promise.reject();
    let exc = JSON.parse(text);
    store.dispatch(showMessage({ message: exc.message, type: "error" }));
  };
}
