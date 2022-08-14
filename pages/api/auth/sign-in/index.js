import supabase from '../../../../hooks/useSupabase'
import cookie from 'cookie'
import Auth from "../../../../hooks/useGoBetweenAuth";

const handler = async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error);
    }
}

export default handler
