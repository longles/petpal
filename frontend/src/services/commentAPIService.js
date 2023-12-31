import { APIService } from './APIService.js';

export const shelterCommentAPIService = () => {
    const API_PATH = 'shelter/';
    const apiService = APIService();

    const createShelterComment = async (shelter_id, comment) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${shelter_id}/comments/`, 'POST', comment);

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

    const getShelterCommentList = async (shelter_id, page = 1, limit = 10) => {
        const response = await apiService.makeAPICall(`${API_PATH}${shelter_id}/comments/?page=${page}&page_size=${limit}`, 'GET');

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

    return {
        createShelterComment,
        getShelterCommentList,
    }
}

export const applicationCommentAPIService = () => {
    const API_PATH = 'application/';
    const apiService = APIService();

    const createApplicationComment = async (application_id, comment) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${application_id}/comments/`, 'POST', {
            content: comment,
        });

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

    const getApplicationCommentList = async (application_id, page) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${application_id}/comments/?page=${page}`, 'GET');

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

    return {
        createApplicationComment,
        getApplicationCommentList,
    }
}