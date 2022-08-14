import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'

export const fetchAllApps = async (token) => {
    return axios({
        method: 'get',
        url: `${BASE_URL}/apps`,
        data,
    }).then((response) => {
        return response.data
    })
}

export const fetchApp = async (id) => {
    return axios({
        method: 'get',
        url: `${BASE_URL}/apps`,
        data: {
            id,
        },
    }).then((response) => {
        return response.data
    })
}

export const insertApp = async (data) => {
    return await axios({
        method: 'post',
        url: `${BASE_URL}/apps`,
        data,
    }).then((response) => {
        return response.data
    })
}

export const signInAuth = async (data) => {
    return await axios({
        method: 'post',
        url: `${BASE_URL}/auth/sign-in`,
        data,
    }).then((response) => {
        return response.data
    })
}

export const signOutAuth = async (token) => {
    return axios({
        method: 'get',
        url: `${BASE_URL}/auth/sign-out`,
    }).then((response) => {
        return response.data
    })
}

export const fetchMe = async () => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/auth/user`,
    }).then((response) => {
        return response.data
    })
}

export const fetchAllCredentials = async (token) => {
    return axios({
        method: 'get',
        url: `${BASE_URL}/credentials`,
        data
    }).then((response) => {
        return response.data
    })
}

export const fetchOneCredential = async (id) => {
    return axios({
        method: 'get',
        url: `${BASE_URL}/credentials`,
        data: {
            id,
        },
    }).then((response) => {
        return response.data
    })
}

export const insertCredential = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/credentials/insert`,
        data,
    }).then((response) => {
        return response.data
    })
}

export const updateCredential = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/credentials/update`,
        data,
    }).then((response) => {
        return response.data
    })
}


export const fetchAllAuthProviders = async (token) => {
    return axios({
        method: 'get',
        url: `${BASE_URL}/providers/fetchAll`,
    }).then((response) => {
        return response.data
    })
}

export const fetchAuthProvider = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/providers/fetchOne`,
        data,
    }).then((response) => {
        return response.data
    })
}

export const insertAuthProvider = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/providers/insert`,
        data,
    }).then((response) => {
        return response.data
    })
}

export const signIn = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/auth/sign-in`,
        data,
    }).then((response) => {
        return response.data
    })
}

export const signUp = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/auth/sign-up`,
        data,
    }).then((response) => {
        return response.data
    })
}

export const signOut = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/auth/sign-out`,
        data,
    }).then((response) => {
        return response.data
    })
}


export const resetPassword = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/auth/reset-password`,
        data,
    }).then((response) => {
        return response.data
    })
}
export const setPassword = async (data) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}/auth/set-password`,
        data,
    }).then((response) => {
        return response.data
    })
}

