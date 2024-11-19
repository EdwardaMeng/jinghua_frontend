import http from "../http-common";

class DmDataService {
    getAllDM() {
        return http.get(`/dm/getAllDm`);
    }

    createDM(data) {
        return http.post(`/dm/createDm`, data);
    }

    modifyDM(data) {
        return http.put(`/dm/updateDm/${data.name}`, data);
    }

    deleteDM(data) {
        return http.delete(`/dm/deleteDm/${data}`, data);
    }
}

export default new DmDataService();