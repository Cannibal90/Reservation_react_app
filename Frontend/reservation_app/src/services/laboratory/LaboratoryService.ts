import { Service } from "../Service";
import { store } from "../../store/store";
import { showMessage } from "../../store/actions/messageAction";
import { LaboratoryResponse } from "../../models/LaboratoryInterfaces";

export class LaboratoryService extends Service {
  host = "http://localhost:8989/laboratory";
  user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  token = this.user ? this.user.token : "";

  async getAllRooms(): Promise<LaboratoryResponse[] | undefined> {
    let rooms = await fetch(this.host + "/room", {
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
    return rooms;
  }
}
