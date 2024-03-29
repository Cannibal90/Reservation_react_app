import { Service } from "../Service";
import { store } from "../../store/store";
import { showMessage } from "../../store/actions/messageAction";
import {
  LaboratoryRequest,
  LaboratoryResponse,
} from "../../models/LaboratoryInterfaces";
import { DeskRequest, DeskResponse } from "../../models/DeskInterfaces";
import {
  ComputerStationRequest,
  ComputerStationResponse,
} from "../../models/StationInterfaces";

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

  async getAllDesksForRoom(id: number): Promise<DeskResponse[] | undefined> {
    let desks = await fetch(this.host + "/desk/room/" + id, {
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
    return desks;
  }

  async getAllStationsForDesk(
    id: number
  ): Promise<ComputerStationResponse[] | undefined> {
    let stations = await fetch(this.host + "/computer/desk/" + id, {
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

    return stations;
  }

  async createRoom(
    roomInfo: LaboratoryRequest
  ): Promise<LaboratoryResponse | undefined> {
    let room = await fetch(this.host + "/room", {
      method: "POST",
      body: JSON.stringify(roomInfo),
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
    return room;
  }

  async deleteLaboratoryById(id: number): Promise<{} | undefined> {
    return await fetch(this.host + "/room/" + id, {
      method: "DELETE",
      headers: {
        Authorization: this.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return;
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

  async updateRoom(
    roomDetails: LaboratoryRequest,
    id: number
  ): Promise<LaboratoryResponse | undefined> {
    let room = await fetch(this.host + "/room/" + id, {
      method: "PUT",
      body: JSON.stringify(roomDetails),
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
    return room;
  }

  // ////////////
  async createDesk(deskInfo: DeskRequest): Promise<DeskResponse | undefined> {
    let desk = await fetch(this.host + "/desk", {
      method: "POST",
      body: JSON.stringify(deskInfo),
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
    return desk;
  }

  async deleteDeskById(id: number): Promise<{} | undefined> {
    return await fetch(this.host + "/desk/" + id, {
      method: "DELETE",
      headers: {
        Authorization: this.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return;
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

  async updateDesk(
    deskDetails: DeskRequest,
    id: number
  ): Promise<DeskResponse | undefined> {
    let desk = await fetch(this.host + "/desk/" + id, {
      method: "PUT",
      body: JSON.stringify(deskDetails),
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
    return desk;
  }

  // ////////////
  async createStation(
    stationInfo: ComputerStationRequest
  ): Promise<DeskResponse | undefined> {
    let station = await fetch(this.host + "/computer", {
      method: "POST",
      body: JSON.stringify(stationInfo),
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
    return station;
  }

  async deleteStationById(id: number): Promise<{} | undefined> {
    return await fetch(this.host + "/computer/" + id, {
      method: "DELETE",
      headers: {
        Authorization: this.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return;
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

  async updateStation(
    stationDetails: ComputerStationRequest,
    id: number
  ): Promise<DeskResponse | undefined> {
    let station = await fetch(this.host + "/computer/" + id, {
      method: "PUT",
      body: JSON.stringify(stationDetails),
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
    return station;
  }
}
