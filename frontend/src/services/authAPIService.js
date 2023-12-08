import { APIService } from './APIService.js';

export const authAPIService = () => {
    const API_PATH = 'accounts/'
    const apiService = APIService();

    const register = async (email, password, username, user_object) => {
        console.log(email);
        console.log(password);
        console.log(username);
        console.log(user_object);
        const response = await apiService.makeAPICall(`${API_PATH}`, 'POST', {
            user_object: user_object,
            email: email,
            password: password,
            username: username
        });

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail,  // should be an error message like response.message
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const login = async (username, password) => {
        const response = await apiService.makeAPICall(`${API_PATH}login/`, 'POST', {
            username: username,
            password: password,
        });

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail, // same here
            }
        }

        localStorage.setItem('token', response.data.access); // Store token in local storage
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_object_id', response.data.user_object_id)
        localStorage.setItem('user_type', response.data.user_type);

        return {
            success: true,
            data: response.data,
        }
    }

    const logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_type');

        return {
            success: true,
        }
    }

    return {
        register,
        login,
        logout,
    }
}