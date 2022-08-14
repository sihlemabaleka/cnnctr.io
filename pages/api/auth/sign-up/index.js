import supabase from '../../../../hooks/useSupabase'

const handler = async (req, res) => {
    try{
    const {username, password, ...data} = req.body.data

    const { user } = await Auth.signUp({ username, password, attributes: { ...data} });

    return res.json({
        status: 200,
        data: user
    });
        
    }catch(e) {
        return res.json({
            error
        })
    }
}

export default handler
