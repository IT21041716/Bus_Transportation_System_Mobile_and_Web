// reservationCancelService.js
import axios from "axios";

class ReservationCancelService {
  static instance = null;
  baseUrl = "http://localhost:5005";

  static getInstance() {
    if (!ReservationCancelService.instance) {
      ReservationCancelService.instance = new ReservationCancelService();
    }
    return ReservationCancelService.instance;
  }

  async createReservationCancel(data) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/reservation-cancels`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getReservationCancels() {
    try {
      const response = await axios.get(`${this.baseUrl}/reservation-cancels`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getReservationCancelById(id) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/reservation-cancels/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateReservationCancel(id, data) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/reservation-cancels/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteReservationCancel(id) {
    try {
      await axios.delete(`${this.baseUrl}/reservation-cancels/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default ReservationCancelService;
