import axios from 'axios'

const fetchAllApps = async (token) => {
  return axios({
    method: 'get',
    url: '/apps',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const fetchApp = async (token, id) => {
  return axios({
    method: 'get',
    url: '/apps',
    data: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const insertApp = async (token, data) => {
  return await axios({
    method: 'post',
    url: '/apps',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const signInAuth = async (data) => {
  return await axios({
    method: 'post',
    url: '/auth/sign-in',
    data,
  }).then((response) => {
    return response.data
  })
}

const signOutAuth = async (token) => {
  return axios({
    method: 'get',
    url: '/auth/sign-out',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const fetchMe = async (token) => {
  return axios({
    method: 'post',
    url: '/me',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const fetchAllCredentials = async (token) => {
  return axios({
    method: 'get',
    url: '/credentials',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const fetchOneCredential = async (token, id) => {
  return axios({
    method: 'get',
    url: '/credentials',
    data: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const insertCredential = async (token, data) => {
  return axios({
    method: 'post',
    url: '/credentials/insert',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const updateCredential = async (token, data) => {
  return axios({
    method: 'post',
    url: '/credentials/update',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}


const fetchAllAuthProviders = async (token) => {
  return axios({
    method: 'get',
    url: '/providers/fetchAll',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const fetchAuthProvider = async (token, data) => {
  return axios({
    method: 'post',
    url: '/providers/fetchOne',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const insertAuthProvider = async (token, data) => {
  return axios({
    method: 'post',
    url: '/providers/fetchOne',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data
  })
}

const API = {
  fetchAllApps,
  fetchApp,
  insertApp,
  signInAuth,
  fetchAllAuthProviders,
  signOutAuth,
  fetchMe,
  insertCredential,
  updateCredential,
  fetchAuthProvider,
  insertAuthProvider,
  fetchAllCredentials,
  fetchOneCredential
}

export default API
