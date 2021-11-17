import {  CREDENTIALS_API_ROUTE } from '../../../../constants/api_constants'
import supabase from '../../../../hooks/useSupabase'

const handler = async (req, res) => {
  const session = req.headers.Authorization

  supabase.auth.setAuth(session)

  let { data, error } = await supabase
    .from(CREDENTIALS_API_ROUTE)
    .select(`*`)

    if (error) {
      return {
        status: error.status,
        message: error.message,
      }
    }

  return res.status(200).json({ data })
}

export default handler
