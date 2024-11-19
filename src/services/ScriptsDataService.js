import http from "../http-common";

class ScriptDataService {

    getAll() {
        return http.get("/script/getAllScripts");
    }

    get(data) {
        return http.get(`/script/${data}`);
    }

    getScriptsByType(data) {
        return http.get(`/script/getScriptsByType/${data}`);
    }

    getScriptsByPlayersNumber(data) {
        return http.get(`/script/getScriptsByPlayersNumber/${data}`);
    }

    getScriptsByTypeAndNumber(type, number) {
        return http.get(`/script/getScriptsByTypeAndPlayersNumber/${type}/${number}`);
    }

    create(data) {
        return http.post(`/script/uploadScript`, data);
    }

    modify(data) {
        return http.put(`/script/updateScript/${data.scriptName}`, data);
    }

    delete(data) {
        return http.delete(`/script/deleteScript/${data}`, data);
    }
}

export default new ScriptDataService();