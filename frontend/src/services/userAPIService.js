import { APIService } from './APIService.js';

export const seekerAPIService = () => {
    const API_PATH = 'accounts/seekers/';
    const apiService = APIService();

    const getSeekerDetail = async (id) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'GET');

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const updateSeeker = async (id, to_update) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'PATCH', to_update);

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const deleteSeeker = async (id) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'DELETE');

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail,
            }
        }

        return {
            success: true,
        }
    }

    return {
        getSeekerDetail,
        updateSeeker,
        deleteSeeker,
    }
}

export const shelterAPIService = () => {
    const API_PATH = 'accounts/shelters/';
    const apiService = APIService();

    const getShelterDetail = async (id) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'GET');

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const getShelterList = async (page) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}?page=${page}`, 'GET');

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const updateShelter = async (id, to_update) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'PATCH', to_update);

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const deleteShelter = async (id) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'DELETE');

        if (!response.success) {
            return {
                success: false,
                message: response.data.detail,
            }
        }

        return {
            success: true,
        }
    }

    return {
        getShelterDetail,
        getShelterList,
        updateShelter,
        deleteShelter,
    }
}