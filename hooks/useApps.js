import {useQuery} from 'react-query';
import API from '../api/API';
import getCookie from './useCookie';

const getApps = async accessToken => {
    const {fetchAllApps} = API;
    let URL = '/api/providers/fetchAll';
    return await fetchAllApps(accessToken, URL);
};
const getSingleApp = async (accessToken, data) => {
    const {fetchApp} = API;
    let URL = '/api/apps/fetchOne';
    return await fetchApp(accessToken, URL, data);
};
const addApp = async (accessToken, data) => {
    const {insertApp} = API;
    let URL = '/api/apps/insert';
    return await insertApp(accessToken, URL, data);
};

const useAppsQuery = key => {
    // Get access token
    const accessToken = getCookie();

    return useQuery(['apps', key], () => getApps(accessToken), {
        enabled: !!accessToken,
        keepPreviousData: true,
    });
};
export {useAppsQuery, addApp, getApps, getSingleApp};
