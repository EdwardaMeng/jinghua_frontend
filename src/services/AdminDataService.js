import http from "../http-common";

class AdminDataService {
    login(data) {
        return http.post(`/admin/login`, data);
    }
}

export default new AdminDataService();