import Cookies from "cookies";

export const getCookie = (request, response, key) => {
    // Get a cookie
    const cookie = new Cookies(request, response, key);
    return cookie.get(key) || null
};

export const setCookie = (request, response, {key = "session", value}) => {
    // Get a cookie
    const cookie = new Cookies(request, response);
    return cookie.set(key, value)
};

export const removeCookie = (request, response, key) => {
    // Get a cookie
    const cookie = new Cookies(request, response);
    return cookie.set(key)
};

const useCookies = {
    getCookie,
    setCookie,
    removeCookie
}

export default useCookies

