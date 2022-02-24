const BITKUB_ACCOUNT_URL = 'https://accounts.bitkubnext.com'

export const getOAuth2AuthorizeURL = (url = BITKUB_ACCOUNT_URL, clientId: string, redirectURI: string, state?: string) => {
    const _redirectURI = encodeURIComponent(redirectURI)
    let oauth2URL = `${url}/oauth2/authorize?response_type='code'&client_id=${clientId}&redirect_uri=${_redirectURI}`

    if (state) {
        oauth2URL += `&state=${state}`
    }

    return oauth2URL
}

export const exchangeAuthorizationCode = async (
    url = BITKUB_ACCOUNT_URL,
    clientId: string,
    redirectURI: string,
    code: string,
) => {
    try {
        const _url = `${url}/oauth2/access_token`
        const request = await fetch(_url, {
            method: 'POST',
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
        } as {
            access_token: string
            refresh_token?: string
        }
    } catch (error) {
        return error
    }
}

export const exchangeRefreshToken = async (url = BITKUB_ACCOUNT_URL, clientId: string, refreshToken: string) => {
    try {
        const _url = `${url}/oauth2/access_token`
        const request = await fetch(_url, {
            method: 'POST',
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
        } as {
            access_token: string
            refresh_token?: string
        }
    } catch (error) {
        return error
    }
}
