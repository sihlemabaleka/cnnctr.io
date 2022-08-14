import {CREDENTIALS_API_ROUTE} from '../../../../constants/api_constants'
import supabase from '../../../../hooks/useSupabase'

const handler = async (req, res) => {
    const {service, ...body} = req.body

    supabase.auth.setAuth(req.cookies.token)
    let {user, error: userError} = await supabase.auth.api.getUser(req.cookies.token)

    if (userError) {
        console.log(userError)
        res.status(401)
        res.json({error: userError})
        res.end()
        return
    }

    let {data: item, error: errorFind} = await supabase
        .from(CREDENTIALS_API_ROUTE)
        .select(`*`)
        .eq('service', service)
        .single();

    console.log({errorFind})

    let _data = {};
    if (user) {
        _data.user_id = user.id
        _data.credentials = body
        _data.service = service
    }

    if (item) {
        console.log({item})
        item.credentials = body
        console.log({item})
        let {data, error} = await supabase
            .from(CREDENTIALS_API_ROUTE)
            .update([item])
            .eq("id", item.id)

        if (error) {
            res.status(401)
            res.json({error})
            res.end()
            return
        }
        res.status(200)
        res.json({data})
        res.end()
        return
    }


    let {data, error} = await supabase
        .from(CREDENTIALS_API_ROUTE)
        .insert([_data])


    if (error) {
        console.log(error)
        res.status(401)
        res.json({error})
        res.end()
        return
    }

    res.status(200)
    res.json({data})
    res.end()
    return
}

export default handler
