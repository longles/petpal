import { APIService } from './APIService.js';

export const notificationAPIService = () => {
    const API_PATH = 'notifications/';
    const apiService = APIService();

    const createNotification = async (user, link_id, notif_type, content) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}`, 'POST', {
            user: user,
            link_id: link_id,
            notification_type: notif_type,
            content: content,
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

    const getNofiticationDetail = async (id) => {
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

    const getNotificationList = async (page = 1) => {
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

    const updateNotificationIsRead = async (id, status = true) => {
        const response = await apiService.makePrivateAPICall(`${API_PATH}${id}/`, 'PATCH', {
            is_read: status,
        });

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
        createNotification,
        getNOfiticationDetail,
        getNotificationList,
        updateNotificationIsRead,
    }
}
