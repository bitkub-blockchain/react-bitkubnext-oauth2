import React from 'react'

import { getOAuth2AuthorizeURL } from './helpers/oauth2'

export interface ReactBitkubNextOauth2Props {
    /** oauth2 client ID */
    clientId: string
    /** oauth2 redirect URI */
    redirectURI: string
    /** oauth2 state callback */
    state?: string
}

export const ReactBitkubNextOauth2: React.FC<ReactBitkubNextOauth2Props> = (props) => {
    const { children, clientId, redirectURI, state } = props

    const handlerOnConnect = () => {
        const oauth2URL = getOAuth2AuthorizeURL(clientId, redirectURI, state)
        window.location.href = oauth2URL
    }

    return <>{React.cloneElement(children as any, { onClick: handlerOnConnect })}</>
}
