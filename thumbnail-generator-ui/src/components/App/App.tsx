import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Register from "../Register/Register";
import AuthProvider from "../../context/context.auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Resizer from "../Resizer/Resizer";
import Login from "../Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Container className="app-thumbnail-container">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Resizer}
              redirectPath="/login"
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
};

export default App;
