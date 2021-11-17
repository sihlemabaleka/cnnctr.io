import {useQuery} from 'react-query';
import API from '../api/API';
import getCookie from './useCookie';

const getAuthProviders = async accessToken => {
    const {fetchAllAuthProviders} = API;
    let URL = '/api/providers/fetchAll';
    return await fetchAllAuthProviders(accessToken, URL);
};

const addAuthProvider = async (accessToken, data) => {
    const {insertAuthProvider} = API;
    let URL = '/api/providers/fetchAll';
    return await insertAuthProvider(accessToken, URL, data);
};

const useAuthProvidersQuery = key => {
    // Get access token
    const accessToken = getCookie();

    return useQuery(
        ['AuthProviders', key],
        () => getAuthProviders(accessToken),
        {
            enabled: !!accessToken,
            keepPreviousData: true,
        }
    );
};
export {useAuthProvidersQuery, getAuthProviders, addAuthProvider};
