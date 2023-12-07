import { APIService } from "./APIService.js";

export const applicationFormAPIService = () => {
    const API_PATH = 'pets/applications/form/';
    const apiService = APIService();

    const createApplication = async (questions_arr) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}`, 'POST', {
            questions: questions_arr,
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

    const getApplicationFormDetail = async (form_id) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${form_id}/`, 'GET', {});

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

    const getApplicationFormList = async (page) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}?page=${page}`, 'GET', {});

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

    const deleteApplicationForm = async (form_id) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${form_id}/`, 'DELETE');

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
        createApplication,
        getApplicationFormDetail,
        getApplicationFormList,
        deleteApplicationForm,
    }
}

export const applicationFormAPIUtils = () => {
    const createQuestionObject = (question_title, question_type, question_prompt) => {
        return {
            title: question_title,
            question_object: {
                type: question_type,
                prompt: question_prompt,
            }
        }
    }

    return {
        createQuestionObject,
    }
}
