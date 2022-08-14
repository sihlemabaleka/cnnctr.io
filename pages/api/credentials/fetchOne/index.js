import supabase from '../../../../hooks/useSupabase';
import {CREDENTIALS_API_ROUTE} from '../../../../constants/api_constants';
import Cookies from "cookies";

const handler = async (req, res) => {

    let {id} = req.body;

    // Create a cookies instance
    const cookies = new Cookies(req, res)
    // Get a cookie
    const session = cookies.get('session')

    supabase.auth.setAuth(session)

    let {data, error} = await supabase
        .from(CREDENTIALS_API_ROUTE)
        .select(`*`)
        .eq('id', id)
        .single();

    if (error) {
        return {
            error
        }
    }

    res.status(200)
    res.json({data})
    res.end()
    return
};

export default handler;
