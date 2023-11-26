import APIConfig from '../config/APIConfig';

makeAPICall = async (path, method, data) => {
    const API_URL = APIConfig.API_URL;

    const result = {
        success: false,
        data: {},
    }

    const headers = new Headers();
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

    if (response.status === 200) {
        result.success = true;
    }

    return result;
}

makePrivateAPICall = async (path, method, data) => {
    const API_URL = APIConfig.API_URL;

    const result = {
        success: false,
        data: {},
    }

    const headers = new Headers();
    let requestData = null;

    if (method === "POST" || method === "PUT") {
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        requestData = JSON.stringify(data);
    }

    const token = await AsyncStorage.getItem('token');

    headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(`${API_URL}${path}`, {
        method: method,
        headers: headers,
        body: requestData,
    });

    result.data = await response.json();

    if (response.status === 200) {
        result.success = true;
    }

    return result;
}

export default {
    makeAPICall,
    makePrivateAPICall,
}