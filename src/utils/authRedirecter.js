import nextCookie from "next-cookies"

export const redirectIfNotAuth = (ctx) => {

    const {authToken} = nextCookie(ctx)
    if (!authToken) {
        ctx.res.writeHead(302, {Location: '/signin'})
        ctx.res.end()
    }

    return
}