import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true, // спец параметр передающий авторизованность, логин пароль, чтобы ушел авторизованный пароль на сервер 
    headers: {
        'API-KEY': 'e88ac80f-779f-463f-a50b-aa1281567171',
    },
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    unFollowApiFunc(id) {
        return instance.delete(`follow/${id}`);
    },
    followApiFunc(id) {
        return instance.post(`follow/${id}`);
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
    }

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

export const loginFormAPI = {
    
}
            