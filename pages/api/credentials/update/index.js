import { CREDENTIALS_API_ROUTE } from '../../../../constants/api_constants'
import supabase from '../../../../hooks/useSupabase'
export default async function handler(req, res) {
  const session = req.headers.Authorization

  let body = req.body

  supabase.auth.setAuth(session)
  const { data, error } = await supabase
    .from(CREDENTIALS_API_ROUTE)
    .update(body)
    .match({ id: body.id })

  if (error) {
    return {
      status: error.status,
      message: error.message,
    }
  }
  return res.status(200).json({ data })
}
