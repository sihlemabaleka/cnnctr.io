import supabase from '../../../../hooks/useSupabase'
import crypto from "crypto";
import {APPS_API_ROUTE} from '../../../../constants/api_constants';

const handler = async (req, res) => {
    const session = req.headers.Authorization
    const body = req.body

    supabase.auth.setAuth(session)

    const {publicKey, privateKey} = getEncryptionKeys;
    let {data, error } = await supabase.from(APPS_API_ROUTE).insert([{
        encryption_public_key: publicKey,
        encryption_private_key: privateKey, ...body
    }])


    if (error) {
        return {
            status: error.status,
            message: error.message,
        }
    }
    return res.status(200).json({data})
}

const getEncryptionKeys = () => {
    const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 2048,
    })

    return {publicKey, privateKey}
}


export default handler
