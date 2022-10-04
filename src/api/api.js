import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true, // спец параметр передающий авторизованность, логин пароль, чтобы ушел авторизованный пароль на сервер 
    headers: {
        'API-KEY': 'e88ac80f-779f-463f-a50b-aa1281567171',
        'Content-Type': 'application/json'
    },
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            }); 
    },
    getFollowedUsers(currentPage, pageSize, friend) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&friend=${friend}`)
            .then(response => {
                return response.data;
            }); 
    },
    getAllUsers(page, amount) {
        return instance.get(`users?page=${page}&count=${amount}`);
    },
    unFollowApiFunc(id) {
        return instance.delete(`follow/${id}`);
    },
    followApiFunc(id) {
        return instance.post(`follow/${id}`);
    },
    findUsers(currentPage, pageSize, term) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
            .then(response => {
                return response.data;
            }); 
    },        
}


export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, { status: status });
    },
    updateProfile(data) {
        return instance.put(`profile`, data)
    },
    savePhoto(photoFile) {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData, {headers: {
            'Content-type': 'multipart/form-data',
        } })
    },

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(FormData) {
        return instance.post('/auth/login', FormData);
    },
    logout() {
        return instance.delete(`/auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
}

export const dialogsAPI = {
    startDialog(userId) {
        return instance.put(`dialogs/${userId}`);
    },
    getDialogs() {
        return instance.get(`dialogs`);
    },
    getMessages(userId) {
        return instance.get(`dialogs/${userId}/messages`);
    },
    sendMessage(userId, body) {
        return instance.post(`dialogs/${userId}/messages`, body);
    },
    getIsViewed(messageId) {
        return instance.get(`dialogs/messages/${messageId}/viewed`);
    },
    spam(messageId) {
        return instance.post(`dialogs/messages/${messageId}/spam`);
    },
    deleteMsg(messageId) {
        return instance.delete(`dialogs/messages/${messageId}`);
    },
    deleteMsg(messageId) {
        return instance.put(`dialogs/messages/${messageId}/restore`);
    },
}
            