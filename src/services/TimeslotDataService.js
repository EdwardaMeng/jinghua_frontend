import http from "../http-common";

class TimeslotDataService {

    getAllTimeslotsByName(name) {
        return http.get(`/timeslot/getAllTimeslotsByName/${name}`, name);
    }

    getAllAvailableTimeslotsByName(name) {
        return http.get(`/timeslot/getAllAvailableTimeslotsByName/${name}`, name);
    }

    uploadTimeslots(data) {
        return http.post(`/timeslot/uploadTimeslot`, data);
    }

    reserveTimeslot(data) {
        return http.post(`/timeslot/reserveTimeslot/${data.timeslot}`, data);
    }

    deleteTimeslots(data) {
        return http.delete(`/timeslot/deleteTimeslot/${data.dm}/${data.timeslot}`, data);
    }


}

export default new TimeslotDataService();