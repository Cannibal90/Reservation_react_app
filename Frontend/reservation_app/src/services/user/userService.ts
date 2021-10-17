import { Service } from "../Service";
import {
  UserLogin,
  UserPassword,
  UserRegister,
  UserRequest,
  UserResponse,
} from "../../models/UserInterfaces";
import { store } from "../../store/store";
import { showMessage } from "../../store/actions/messageAction";

export class UserService extends Service {
  host = "http://localhost:8989/users/user";
  user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  token = this.user ? this.user.token : "";

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

  async getUserById(id: number): Promise<UserResponse | undefined> {
    let user = await fetch(this.host + "/" + id, {
      method: "GET",
      headers: {
        Authorization: this.token,
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

  async deleteUserById(id: number): Promise<{} | undefined> {
    return await fetch(this.host + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: this.token,
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
  }

  async updateUser(
    credentials: UserRequest,
    id: number
  ): Promise<UserResponse | undefined> {
    let user = await fetch(this.host + "/" + id, {
      method: "PUT",
      body: JSON.stringify(credentials),
      headers: {
        Authorization: this.token,
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

  async changePassword(
    credentials: UserPassword,
    id: number
  ): Promise<UserResponse | undefined> {
    let user = await fetch(this.host + "/password/" + id, {
      method: "PUT",
      body: JSON.stringify(credentials),
      headers: {
        Authorization: this.token,
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
