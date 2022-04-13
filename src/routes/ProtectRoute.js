import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getTokenSelector } from "../redux/selector";
function ProtectRouter({ component: Component, ...rest }) {

  const isAuth = useSelector(getTokenSelector);
 
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <>
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
export default ProtectRouter;
