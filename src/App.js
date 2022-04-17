import React, { lazy } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { getTokenSelector } from "./redux/selector";
import { useSelector } from "react-redux";
import ProtectRoute from './routes/ProtectRoute'
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
function App() {
  const getAuth = useSelector(getTokenSelector);
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <ProtectRoute path="/app" component={Layout} />
          <Redirect from="/" to="/login"  component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
