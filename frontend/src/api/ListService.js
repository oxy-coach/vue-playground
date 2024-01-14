import axios from "axios";

const url = '/data';
const instance = axios.create({
    baseURL: 'http://localhost:3000',
})

const client = {
    getList: async function () {
        const response = await instance.get(url);
        return response.data.list ?? [];
    },
    saveList: async function (data) {
        await instance.post(url, { list: data });
    }
};

export default client;
