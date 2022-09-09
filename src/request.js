import axios from "axios";

export class Request {
    constructor(url) {
        this.url = url;
    }

    async get() {
        const request = await axios.get(this.url);
        return request.data;
    }

    async post(data) {
        const request = await axios.post(this.url, data);
        return request.data;
    }

    async put(id, data) {
        const request = await axios.put(this.url + id, data);
        return request.data;
    }

    async delete(id) {
        const request = await axios.delete(this.url + id);
        return request;
    }
}