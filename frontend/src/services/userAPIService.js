import { APIService } from './APIService.js';


export const accountAPIService = () => {
    const apiService = APIService();

    const updateUser = async (id, userData) => {
        const response = await apiService.makePrivateAPICall(`accounts/${id}/`, 'PATCH', {
            username: userData.username,
            email: userData.email
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

    const updatePwd = async (id, pwd) => {
        const response = await apiService.makePrivateAPICall(`accounts/${id}/`, 'PATCH', {
            password: pwd
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

    return {
        updateUser,
        updatePwd
    }
}

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

    const updateSeeker = async (id, seekerDetails) => {
        // let formData = new FormData()
        // formData.append('name', seekerDetails.name)
        // formData.append('account', JSON.stringify({username: seekerDetails.username, email: seekerDetails.email}))
        // console.log(formData.get('account'))
        // {
        //     name: seekerDetails.name,
        //     bio: seekerDetails.bio,
        //     phoneNum: seekerDetails.phoneNum,
        //     profilePic: seekerDetails.profilePic,
        //     account: {
        //         username: seekerDetails.username,
        //         // email: seekerDetails.email
        //     }
        // }

        // const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'PATCH', formData, 'multipart/form-data');
        const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'PATCH', {
            name: seekerDetails.name,
            bio: seekerDetails.bio,
            phone_num: seekerDetails.phoneNum,
            profile_pic: seekerDetails.profilePic
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