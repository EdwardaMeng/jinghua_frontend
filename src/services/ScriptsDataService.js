import http from "../http-common";

class ScriptDataService {
    getAll() {
        return http.get("/");
    }

    get(data) {
        return http.get(`/${data.value}`);
    }

    create(data) {
        return http.post("/uploadScript", data);
    }

    modify(data) {
        return http.put(`/${data.value}`, data);
    }

    delete(data) {
        return http.delete(`/${data.value}`);
    }
}

export default new ScriptDataService();