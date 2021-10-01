import { Service } from "../Service";
import {
  UserLogin,
  UserRegister,
  UserResponse,
} from "../../models/UserInterfaces";
import { store } from "../../store/store";
import { showMessage } from "../../store/actions/messageAction";

export class UserService extends Service {
  host = "http://localhost:8989/users/user";

  async loginUser(credentials: UserLogin): Promise<UserResponse | undefined> {
    let user = await fetch(this.host + "/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        response.text().then((text) => this.handleError(text));
        return Promise.reject();
      })
      .catch((error) => {
        store.dispatch(
          showMessage({ message: "Connection failed", type: "error" })
        );
        return Promise.reject();
      });
    return user;
  }

  async register(credentials: UserRegister): Promise<UserResponse | undefined> {
    let user = await fetch(this.host + "/register", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        response.text().then((text) => this.handleError(text));
        return Promise.reject();
      })
      .catch((error) => {
        store.dispatch(
          showMessage({ message: "Connection failed", type: "error" })
        );
        return Promise.reject();
      });
    return user;
  }
}
