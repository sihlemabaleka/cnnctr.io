import supabase from '../../../../hooks/useSupabase'

const handler = async (req) => {
    const {username, code, new_password} = req.body

    const data = await Auth.forgotPasswordSubmit(username, code, new_password)

    if (error) {
        return {
            status: error.status,
            message: error.message,
        }
    }

    return {
        status: 200,
        body: data,
    }
}

export default handler
