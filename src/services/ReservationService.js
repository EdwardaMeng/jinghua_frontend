import http from "../http-common";

class ReservationService {
    getAllReservations() {
        return http.get(`/reservation/getAllReservations`);
    }

    createReservation(data) {
        return http.post(`/reservation/createReservation`, data);
    }

    deleteDM(data) {
        return http.delete(`/dm/deleteDm/${data}`, data);
    }
}

export default new ReservationService();