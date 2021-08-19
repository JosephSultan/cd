// Client only route (static page is not generated on the server)
// Configured in gatsby-config.js, under the plugin "gatsby-plugin-create-client-paths"

import * as React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from '../utils/privateRoute';
import MyPage from '../components/private-components/myPage';
import NotLoggedIn from '../components/notLoggedIn';
import LoadingSpinner from '../components/loading-spinner';
import { useAuth0 } from '@auth0/auth0-react';

const Informasjon = () => {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  // Prevent not logged in users from accessing private routes
  if (!isAuthenticated) {
    loginWithRedirect();
    return <NotLoggedIn />;
  }

  return (
    <Router>
      <PrivateRoute path='/min-side' component={MyPage} />
    </Router>
  );
};

export default Informasjon;
