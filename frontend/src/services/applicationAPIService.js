import { APIService } from './APIService.js';

export const applicationAPIService = () => {
    const API_PATH = 'pets/applications/';
    const apiService = APIService();

    const createApplication = async (pet_id, responses_arr) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}`, 'POST', {
            pet: pet_id,
            responses: responses_arr,
        });

        if (!response.success) {
            return {
                success: false,
                message: response.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const getApplicationList = async (status, date, page) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}?status=${sort_status}&date_sort=${sort_date}&page=${page}`, 'GET', {});

        if (!response.success) {
            return {
                success: false,
                message: response.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const getApplicationDetail = async (application_id) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${application_id}/`, 'GET', {});

        if (!response.success) {
            return {
                success: false,
                message: response.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const updateApplication = async (application_id, status) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${application_id}/`, 'PATCH', {
            status: status,
        });

        if (!response.success) {
            return {
                success: false,
                message: response.detail,
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    return {
        createApplication,
        getApplicationList,
        getApplicationDetail,
        updateApplication,
    }
}

// Use this for generating the response object for the application
export const applicationAPIUtils = () => {
    const createResponseObject = (question_id, question_type, response) => {
        return {
            question: question_id,
            response_object: {
                type: question_type,
                response: response,
            }
        }
    }

    return {
        createResponseObject,
    }
}