import { API_URL } from "./config/config.js"
import fetch from 'node-fetch';

export const APIService = () => {

    const makeAPICall = async (path, method, data) => {
        const result = {
            success: false,
            data: {},
        }

        const headers = new fetch.Headers();
        let requestData = null;

        if (method === "POST" || method === "PUT" || method === "PATCH") {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            requestData = JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${path}`, {
            method: method,
            headers: headers,
            body: requestData,
        });

        if (response.ok) {
            result.success = true;
        }

        if (method === "DELETE") {
            return result;
        } else {
            result.data = await response.json();
        }

        return result;
    }

    const makePrivateAPICall = async (path, method, data, contentType='application/json') => {
        const result = {
            success: false,
            data: {},
        }

        const headers = new fetch.Headers();
        let requestData = null;

        if (method === "POST" || method === "PUT" || method === "PATCH") {
            headers.set('Accept', 'application/json');
            if (contentType === 'application/json') {
                headers.set('Content-Type', contentType);
                requestData = JSON.stringify(data);
            } else {
                requestData = data
            }
        }
        console.log(requestData)

        const token = localStorage.getItem('token'); // Fetch token from local storage

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        if (contentType !== 'application/json') {
            //console.log(requestData.get('name'))
        }

        const response = await fetch(`${API_URL}${path}`, {
            method: method,
            headers: headers,
            body: requestData,
        });

        if (response.ok) {
            result.success = true;
        }

        if (method === "DELETE") {
            return result;
        } else {
            result.data = await response.json();
        }

        return result;
    }

    

    return {
        makeAPICall,
        makePrivateAPICall,
    }
}
