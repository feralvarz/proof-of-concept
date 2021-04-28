import React from "react";
import { useAuth } from "../../context/context.auth";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface IPrivateRouteProps extends RouteProps {
  redirectPath: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  redirectPath,
  ...routeProps
}) => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Route {...routeProps} component={Component} />
  ) : (
    <Redirect to={redirectPath} />
  );
};

export default PrivateRoute;
