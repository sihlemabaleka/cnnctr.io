import supabase from '../../../../hooks/useSupabase'
const handler = async (req) => {
  const session = req.headers.Authorization

  supabase.auth.setAuth(session)

  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      status: error.status,
      message: error.message,
    }
  }

  return {
    status: 302,
    headers: {
      location: '/auth',
      'set-cookie': `session=; path=/; expires=0;`,
    },
  }
}

export default handler
