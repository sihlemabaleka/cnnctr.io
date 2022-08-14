import { CREDENTIALS_API_ROUTE } from '../../../../constants/api_constants'
import supabase from '../../../../hooks/useSupabase'
import Cookies from "cookies";
export default async function handler(req, res) {

  let body = req.body

  // Create a cookies instance
  const cookies = new Cookies(req, res)
  // Get a cookie
  const session = cookies.get('session')

  supabase.auth.setAuth(session)
  const { data, error } = await supabase
    .from(CREDENTIALS_API_ROUTE)
    .update(body)
    .match({ id: body.id })

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
