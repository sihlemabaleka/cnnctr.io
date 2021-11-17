import {useQuery} from 'react-query';
import API from '../api/API';
import getCookie from './useCookie';

const getCredentials = async accessToken => {
    const {fetchAllCredentials} = API;
    let URL = '/api/providers/fetchAll';
    return await fetchAllCredentials(accessToken, URL);
};
const getSingleCredential = async (accessToken, data) => {
    const {fetchOneCredential} = API;
    let URL = '/api/providers/fetchAll';
    return await fetchOneCredential(accessToken, URL, data);
};
const addCredential = async (accessToken, data) => {
    const {insertCredential} = API;
    let URL = '/api/credentials/insert';
    return await insertCredential(accessToken, URL, data);
};

const updateCredential = async (accessToken, data) => {
    const {updateCredential} = API;
    let URL = '/api/credentials/insert';
    return await updateCredential(accessToken, URL, data);
};

const useCredentialsQuery = key => {
    // Get access token
    const accessToken = getCookie();

    return useQuery(['Credentials', key], () => getCredentials(accessToken), {
        enabled: !!accessToken,
        keepPreviousData: true,
    });
};

export {
    useCredentialsQuery,
    updateCredential,
    addCredential,
    getCredentials,
    getSingleCredential,
};
