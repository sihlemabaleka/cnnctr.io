import supabase from '../../../../hooks/useSupabase'

const handler = async (req, res) => {


    const {user, error} = await supabase.auth.api.getUser(req.cookies.token)

    if (error) {
        const refreshToken = req.cookies.session_refresh
        if (refreshToken) {
            const {data, error: refreshError} = await supabase.auth.api.refreshAccessToken(refreshToken)

            if (!refreshError) {
                res.json({data: data})
                res.end()
                return
            }
            res.json({error: refreshError})
            res.end()
            return
        } else {
            res.json({error})
            res.end()
            return
        }
    }

    res.status(200)
    res.json({data: {id: user.id}})
    res.end()
    return;
}

export default handler
