import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Router } from '@reach/router';
import PrivateRoute from '../utils/privateRoute';
import NotLoggedIn from '../components/notLoggedIn';
import LoadingSpinner from '../components/loading-spinner';
import UserAdminPage from '../components/private-components/user-admin/userAdminPage';
import CreateUserPage from '../components/private-components/user-admin/createUserPage';
import UpdateUserPage from '../components/private-components/user-admin/updateUserPage';

function UserAdmin() {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return (
      <NotLoggedIn
        title='Logg inn for brukeradministrasjon'
        description='Du må logge inn for å administrere brukerkontoer for Boligsameiet Gartnerihagen. 
      Du vil da kunne legge til, slette eller endre brukere, samt gi brukere admin-tilgang.
      Ta kontakt med styret.'
        redirectUser='/user-admin'
      />
    );
  }

  return (
    <Router>
      <PrivateRoute path='/user-admin/create-user' component={CreateUserPage} />
      <PrivateRoute path='/user-admin/update-user' component={UpdateUserPage} />
      <PrivateRoute path='/user-admin' component={UserAdminPage} />
    </Router>
  );
}

export default UserAdmin;
