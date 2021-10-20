import { Service } from "../Service";
import { store } from "../../store/store";
import { showMessage } from "../../store/actions/messageAction";
import {
  ReservationRequest,
  ReservationResponse,
} from "../../models/ReservationInterfaces";

export class ReservationService extends Service {
  host = "http://localhost:8989/reservation";
  user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  token = this.user ? this.user.token : "";

  async reserveStation(
    reservationInfo: ReservationRequest
  ): Promise<ReservationResponse | undefined> {
    let reservation = await fetch(this.host + "/reserve", {
      method: "POST",
      body: JSON.stringify(reservationInfo),
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
    return reservation;
  }

  async getReservationForStation(
    id: number
  ): Promise<ReservationResponse[] | undefined> {
    let reservations = await fetch(this.host + "/reserve/station/" + id, {
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
    return reservations;
  }

  async deleteReservation(id: number): Promise<{} | undefined> {
    return await fetch(this.host + "/reserve/" + id, {
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

  async updateReservation(
    reservationInfo: ReservationRequest,
    id: number
  ): Promise<ReservationResponse | undefined> {
    let reservation = await fetch(this.host + "/reserve/" + id, {
      method: "PUT",
      body: JSON.stringify(reservationInfo),
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
    return reservation;
  }

  async getReservationForUser(
    id: number
  ): Promise<ReservationResponse[] | undefined> {
    let reservations = await fetch(this.host + "/reserve/user/" + id, {
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
    return reservations;
  }

  async getAllReservations(): Promise<ReservationResponse[] | undefined> {
    let reservations = await fetch(this.host + "/reserve", {
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
    return reservations;
  }
}
