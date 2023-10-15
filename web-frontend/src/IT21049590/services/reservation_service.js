// reservationService.js
import axios from "axios";

class ReservationService {
  static instance = null;
  baseUrl = "http://localhost:5005";

  static getInstance() {
    if (!ReservationService.instance) {
      ReservationService.instance = new ReservationService();
    }
    return ReservationService.instance;
  }

  async createReservation(data) {
    try {
      const response = await axios.post(`${this.baseUrl}/reservations`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getReservations() {
    try {
      const response = await axios.get(`${this.baseUrl}/reservations`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getReservationById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/reservations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateReservation(id, data) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/reservations/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteReservation(id) {
    try {
      await axios.delete(`${this.baseUrl}/reservations/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default ReservationService;
