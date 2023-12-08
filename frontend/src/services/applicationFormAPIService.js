import { APIService } from "./APIService.js";

export const applicationFormAPIService = () => {
    const API_PATH = 'pets/applications/form/';
    const apiService = APIService();

    const createUpdateApplicationForm = async (name, description, questions_arr, updateFlag, form_id) => {
        let request = {
            name: name,
            description: description,
            questions: questions_arr,
        }
        console.log(request)
        const path = updateFlag ? `${API_PATH}${form_id}/` : `${API_PATH}`
        const response = await apiService.makePrivateAPICall(path, updateFlag ? 'PUT' : 'POST', request);

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
        createUpdateApplicationForm,
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
