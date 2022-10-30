import React, { useEffect, useState, useCallback } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout';
import AuthLayout from '../components/layouts/AuthLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AuthManager from '../services/AuthManager';
import paths from './paths';
import MyProfile from '../pages/MyProfile';
import EditProfile from '../pages/EditProfile';
import Users from '../pages/Users';
import UserProfile from '../pages/UserProfile';
import AddPizza from '../pages/AddPizza';
import EditPizza from '../pages/EditPizza';
import Basket from '../pages/Basket';

const authRouts = [
  {
    path: paths.login,
    exact: true,
    Component: Login,
  },
  {
    path: paths.signUp,
    exact: true,
    Component: SignUp,
  },
];

const appRouts = [
  {
    path: paths.home,
    exact: true,
    Component: Home,
  },
  {
    path: paths.myProfile,
    exact: true,
    Component: MyProfile,
  },
  {
    path: paths.editProfile,
    exact: true,
    Component: EditProfile,
  },
  {
    path: paths.users,
    exact: true,
    Component: Users,
  },
  {
    path: paths.userProfile,
    exact: true,
    Component: UserProfile,
  },
  { path: paths.addPizza, exact: true, Component: AddPizza },
  { path: paths.editPizza, exact: true, Component: EditPizza },
  { path: paths.basket, exact: true, Component: Basket },
];

const useIsLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(AuthManager.isLoggedIn());

  const subscriber = useCallback((token) => {
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    AuthManager.onLoginStatusChange(subscriber);
    return () => {
      AuthManager.offLoginStatusChange(subscriber);
    };
  }, [subscriber]);
  return loggedIn;
};

const RootRouter = () => {
  const loggedIn = useIsLoggedIn();
  return (
    <Router>
      {loggedIn ? (
        <AppLayout>
          <Switch>
            {appRouts.map(({ path, exact, Component }) => {
              return (
                <Route key={paths} exact={exact} path={path}>
                  <Component />
                </Route>
              );
            })}
            <Redirect to={paths.home} />
          </Switch>
        </AppLayout>
      ) : (
        <AuthLayout>
          <Switch>
            {authRouts.map(({ path, exact, Component }) => {
              return (
                <Route key={paths} exact={exact} path={path}>
                  <Component />
                </Route>
              );
            })}
            <Redirect to={paths.login} />
          </Switch>
        </AuthLayout>
      )}
    </Router>
  );
};

export default RootRouter;
