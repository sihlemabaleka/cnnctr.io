import { CLIENT_AUTH_PROVIDERS_API_ROUTE } from '../../../../constants/api_constants'
import supabase from '../../../../hooks/useSupabase'

export default async function handler(req, res) {
  const session = req.headers.Authorization

  let { id } = req.body

  supabase.auth.setAuth(session)

  let { data, error } = await supabase
    .from(CLIENT_AUTH_PROVIDERS_API_ROUTE)
    .select(`data`)
    .eq('app_id', id)
    .single()

  if (error) {
    return {
      status: error.status,
      message: error.message,
    }
  }

  return res.status(200).json({ data })
}
