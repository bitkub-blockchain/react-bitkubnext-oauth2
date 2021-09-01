const BITKUB_ACCOUNT_URL = 'https://accounts.bitkubnext.com'

export const getOAuth2AuthorizeURL = (clientId: string, redirectURI: string, state?: string) => {
    const _redirectURI = encodeURIComponent(redirectURI)
    let oauth2URL =
        BITKUB_ACCOUNT_URL +
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

export const exchangeAuthorizationCode = async (clientId: string, redirectURI: string, code: string) => {
    try {
        const url = BITKUB_ACCOUNT_URL + '/oauth2/access_token'
        const formData = new FormData()
        formData.append('grant_type', 'authorization_code')
        formData.append('client_id', clientId)
        formData.append('redirect_uri', redirectURI)
        formData.append('code', code)

        const request = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: formData,
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

export const exchangeRefreshToken = async (clientId: string, refreshToken: string) => {
    try {
        const url = BITKUB_ACCOUNT_URL + '/oauth2/access_token'
        const formData = new FormData()
        formData.append('grant_type', 'refresh_token')
        formData.append('client_id', clientId)
        formData.append('refresh_token', refreshToken)

        const request = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: formData,
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
