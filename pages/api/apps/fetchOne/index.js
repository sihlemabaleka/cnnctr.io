import supabase from '../../../../hooks/useSupabase'
import { APPS_API_ROUTE } from '../../../../constants/api_constants';
import Cookies from "cookies";

const handler = async (req, res) => {
  // Create a cookies instance
  const cookies = new Cookies(req, res)
  // Get a cookie
  const session = cookies.get('session')

  supabase.auth.setAuth(session)

  let { id } = req.body


  let { data, error } = await supabase
    .from(APPS_API_ROUTE)
    .select(`app_name, app_description, app_url, encryption_public_key`)
    .eq('id', id)
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

export default handler
