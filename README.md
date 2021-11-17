# React BitkubNext Oauth2
## Installation
```sh
yarn add @bitkub-blockchain/react-bitkubnext-oauth2
```
## How to use
##### Step 1 : Connect with bitkub next for your UI-component
```
import { ReactBitkubNextOauth2 } from "@bitkub-blockchain/react-bitkubnext-oauth2"

<ReactBitkubNextOauth2       
    clientId={"YOUR_CLIENT_ID"}
    redirectURI={"YOUR_OAUTH_REDIRECT_URI"}
>
    <button>connect with bitkub next</button>
</ReactBitkubNextOauth2>
```
==================
##### Step 2 : When Oauth2 Success, In your redirect uri will have code query string in your URL
```
import { exchangeAuthorizationCode } from '@bitkub-blockchain/react-bitkubnext-oauth2'

const handlerGetAccessToken = async () => {
    const { access_token, refresh_token } = await exchangeAuthorizationCode("YOUR_OAUTH_CLIENT_ID", "YOUR_OAUTH_REDIRECT_URI", code)
    // success
    alert(access_token)
    alert(refresh_token)
}

```
==================
##### Extra : Extend Your Access Token if you have a refresh token
```
import { exchangeRefreshToken } from '@bitkub-blockchain/react-bitkubnext-oauth2'

const handlerExtendAccessToken = async () => {
    const { access_token, refresh_token } = await exchangeRefreshToken("YOUR_OAUTH_CLIENT_ID", "YOUR_REFRESH_TOKEN")
    // success
    alert(access_token)
    alert(refresh_token)
}
```
==================
## ReactBitkubNextOauth2 Props
| Name          | Required      | Type          | Default value |
| :------------ | :----------:  | :----------:  | :----------:  |
| clientId      | true          | String        |               |
| redirectURI   | true          | String        |               |
| mode          | false         | 'new_tab' , 'popup' , 'redirect' |       "new_tab"        |
| state         | false         | String        |               |
| onClick       | false         | () => void    |               |
