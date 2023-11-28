import { API_URL } from "./config/config"
const fetch = require('node-fetch');
const { Headers } = fetch;

export const APIService = () => {

    const makeAPICall = async (path, method, data) => {
        const result = {
            success: false,
            data: {},
        }

        const headers = new fetch.Headers();
        let requestData = null;

        if (method === "POST" || method === "PUT") {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            requestData = JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${path}`, {
            method: method,
            headers: headers,
            body: requestData,
        });

        result.data = await response.json();

        if (response.ok) {
            result.success = true;
        }

        return result;
    }

    const makePrivateAPICall = async (path, method, data) => {
        const result = {
            success: false,
            data: {},
        }

        const headers = new fetch.Headers();
        let requestData = null;

        if (method === "POST" || method === "PUT") {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            requestData = JSON.stringify(data);
        }

        const token = sessionStorage.getItem('token'); // Fetch token from local storage

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        const response = await fetch(`${API_URL}${path}`, {
            method: method,
            headers: headers,
            body: requestData,
        });

        result.data = await response.json();

        if (response.ok) {
            result.success = true;
        }

        return result;
    }

    return {
        makeAPICall,
        makePrivateAPICall,
    }
}
