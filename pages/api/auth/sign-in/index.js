import supabase from '../../../../hooks/useSupabase'
const handler = async (req) => {
  let email = req.body.get('email')
  let password = req.body.get('password')

  const { session, error } = await supabase.auth.signIn({ email, password })

  if (error) {
    return {
      status: error.status,
      message: error.message,
    }
  }

  return {
    status: 200,
    body: 'success',
    headers: {
      'set-cookie': `session=${
        session.access_token
      }; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(
        session.expires_at * 1000
      ).toUTCString()};`,
    },
  }
}

export default handler
