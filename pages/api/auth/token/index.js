import cookie from "cookie";

const handler = async (req, res) => {
    const {data} = req.body.session
    res.setHeader(
        "Set-Cookie", cookie.serialize("token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: data.expires_in * 1000,
            sameSite: "strict",
            path: "/"
        })
    )
    res.end()
}

export default handler