import supabase from '../../../../hooks/useSupabase'

const handler = async (req) => {
    const accessToken = req.body
    const {password} = req.body

    const {error, data} = await supabase.auth.api.updateUser(accessToken, {
        password,
    })

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