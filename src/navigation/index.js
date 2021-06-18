import { Switch, Route } from "react-router-dom";

import Main from 'pages/Main';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Gallery from 'pages/Gallery';
import NotFound from "pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <PrivateRoute path="/gallery">
        <Gallery />
      </PrivateRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Navigation;