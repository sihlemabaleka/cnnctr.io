import {CLIENT_AUTH_PROVIDERS_API_ROUTE} from '../../../../constants/api_constants'
import supabase from '../../../../hooks/useSupabase'
import Cookies from "cookies";

export default async function handler(req, res) {
    let {id} = req.body

    // Create a cookies instance
    const cookies = new Cookies(req, res)
    // Get a cookie
    const session = cookies.get('session')

    supabase.auth.setAuth(session)

    let {data, error} = await supabase
        .from(CLIENT_AUTH_PROVIDERS_API_ROUTE)
        .select(`data`)
        .eq('app_id', id)
        .single()

    if (error) {
        return {
            error
        }
    }

    res.status(200)
    res.json({data})
    res.end()
    return
}
