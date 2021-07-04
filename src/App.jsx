import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';

import { Login, Register, Dashboard, PasswordRecover, PasswordReset } from 'pages';
import { Path, PrivateRoute } from 'routes';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Path.root} render={() => <Redirect to={Path.login} />} />
        <Route path={Path.login} component={Login} />
        <Route path={Path.passwordRecover} component={PasswordRecover} />
        <Route path={Path.passwordReset} component={PasswordReset} />
        <Route path={Path.register} component={Register} />
        <PrivateRoute path={Path.home} component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
