import {CLIENT_AUTH_PROVIDERS_API_ROUTE} from '../../../../constants/api_constants'
import supabase from '../../../../hooks/useSupabase'
import Cookies from "cookies";

export default async function handler(req, res) {
    let body = req.body.data


    supabase.auth.setAuth(req.cookies.token)

    let {data, error} = await supabase
        .from(CLIENT_AUTH_PROVIDERS_API_ROUTE)
        .insert([body])

    if (error) {
        res.status(401)
        res.json({error})
        res.end()
        return
    }
    res.status(200)
    res.json({data})
    res.end()
    return
}
