import React from 'react'

import { getOAuth2AuthorizeURL } from './helpers/oauth2'

export interface ReactBitkubNextOauth2Props {
    /** oauth2 client ID */
    clientId: string
    /** oauth2 redirect URI */
    redirectURI: string
    /** mode */
    mode: 'new_tab' | 'popup' | 'redirect'
    /** oauth2 state callback */
    state?: string
    /** on click button */
    onClick?: () => void
}

export const ReactBitkubNextOauth2: React.FC<ReactBitkubNextOauth2Props> = (props) => {
    const { children, clientId, redirectURI, mode, state, onClick } = props

    const handlerOnConnect = () => {
        if (typeof onClick === 'function') {
            onClick()
        }

        const oauth2URL = getOAuth2AuthorizeURL(clientId, redirectURI, state)

        switch (mode) {
            case 'popup':
                window.open(oauth2URL, '_blank', 'width=600,height=600')
                break
            case 'new_tab':
                window.open(oauth2URL, '_blank')
                break
            case 'redirect':
                window.location.href = oauth2URL
                break
            default:
                window.open(oauth2URL, '_blank')
                break
        }
    }

    return <>{React.cloneElement(children as any, { onClick: handlerOnConnect })}</>
}

ReactBitkubNextOauth2.defaultProps = {
    mode: 'new_tab',
}
