import {APPS_API_ROUTE} from '../../../../constants/api_constants'
import supabase from '../../../../hooks/useSupabase'
import getCookie from "../../../../hooks/useCookie";

const handler = async (req, res) => {
    const session = getCookie()

    supabase.auth.setAuth(session)

    let {data, error} = await supabase
        .from(APPS_API_ROUTE)
        .select(`app_name, app_description, app_url, encryption_public_key`)

    if (error) {
        return {
            status: error.status,
            message: error.message,
        }
    }

    return res.status(200).json({data})
}

export default handler
