import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

const Router = () => (
  <Switch>
    {routes.map(({
      path, component, exact, key,
    }) => (
      <Route exact={exact} path={path} component={component} key={key} />
    ))}
  </Switch>
);

export default Router;
