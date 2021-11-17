import supabase from '../../../../hooks/useSupabase'
import getCookie from "../../../../hooks/useCookie";

const handler = async (req, res) => {
  const session = getCookie()


  const { data: user, error } = await supabase.auth.api.getUser(session)

  if (error) {
    return res.status(200).json({
      status: 400,
      message: error.message,
    })
  }

  return res.status(200).json({ data: user })
}

export default handler
