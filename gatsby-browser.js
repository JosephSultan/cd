import * as React from 'react';
import { wrapPageElement as wrap } from './src/chakra-wrapper';
import { ApolloWrapper } from './src/apollo/apollo-wrapper';
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

// Wrap root element with the necessery things to get auth and Apollo client to work
const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || '/informasjon', { replace: true });
};

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={process.env.GATSBY_AUTH0_DOMAIN}
    clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
    redirectUri={`${window.location.origin}/informasjon`}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloWrapper>{element}</ApolloWrapper>
  </Auth0Provider>
);

export const wrapPageElement = wrap;
