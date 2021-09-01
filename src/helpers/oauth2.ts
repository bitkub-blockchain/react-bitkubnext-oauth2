export const getOAuth2AuthorizeURL = (domain: string, clientId: string, redirectURI: string, state?: string) => {
    const _redirectURI = encodeURIComponent(redirectURI)
    let oauth2URL =
        domain +
        `/oauth2/authorize?` +
        `response_type=${'code'}` +
        '&' +
        `client_id=${clientId}` +
        '&' +
        `redirect_uri=${_redirectURI}`

    if (state) {
        oauth2URL += `&state=${state}`
    }

    return oauth2URL
}

export const sendAuthorizationCode = async (url: string, clientId: string, redirectURI: string, code: string) => {
    try {
        const request = await fetch(url, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: clientId,
                redirect_uri: redirectURI,
                code: code,
            }),
        })

        const { access_token, refresh_token } = await request.json()

        return {
            access_token,
            refresh_token,
        }
    } catch (error) {
        return error
    }
}

export const sendExtendAccessToken = async (url: string, clientId: string, refreshToken: string) => {
    try {
        const request = await fetch(url, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: clientId,
                refresh_token: refreshToken,
            }),
        })

        const { access_token, refresh_token } = await request.json()

        return {
            access_token,
            refresh_token,
        }
    } catch (error) {
        return error
    }
}
