import { Route, Redirect } from "react-router-dom";

import { validateUser } from 'pages/utils';

export const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => validateUser() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }} />
      )} />
  );
};
