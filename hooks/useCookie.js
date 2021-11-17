import cookie from 'cookie';

const getCookie = () => {
    return cookie.parse(request.headers.cookie || '').session || null;
};


export default getCookie;
