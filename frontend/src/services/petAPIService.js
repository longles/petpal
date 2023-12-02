import { APIService } from "./APIService";

export const petAPIService = () => {
    const API_PATH = 'pets/';
    const apiService = APIService();

    // All other fields can be null; include in other_info as required
    const createPet = async (name, other_info) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}`, 'POST', {
            name: name,
            ...other_info,
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

    const getPetDetail = async (id) => {
        const response = await apiService.makeAPICall(`${API_PATH}${id}/`, 'GET');

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

    const getPetList = async (filters, page) => {
        const query_params = new URLSearchParams(filters).toString();
        const response = await apiService.makeAPICall(`${API_PATH}?${query_params}&page=${page}`, 'GET');

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

    const updatePet = async (id, to_update) => {
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

    const deletePet = async (id) => {
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
        createPet,
        getPetDetail,
        getPetList,
        updatePet,
        deletePet,
    }
}

// Maybe add utils for generating pet field jsons or return all field names
