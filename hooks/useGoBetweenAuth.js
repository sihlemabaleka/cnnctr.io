import {useQuery} from 'react-query';
import {fetchMe, resetPassword, setPassword, signIn, signOut, signUp} from '../api/API';

const doSignIn = async data => {
    return await signIn(data);
};
const doSignUp = data => {
    return signUp(data);
};
const doSignOut = data => {
    return signOut(data);
};

const doResetPassword = data => {
    return resetPassword(data);
};

const doSetPassword = data => {
    return setPassword(data);
};

const user = async (accessToken) => {
    return fetchMe(accessToken)
};

const useAuth = {
    signIn: doSignIn,
    signUp: doSignUp,
    signOut: doSignOut,
    resetPassword: doResetPassword,
    setPassword: doSetPassword,
    user: user
}


export default useAuth
