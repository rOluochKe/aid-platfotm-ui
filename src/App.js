import React from "react";
import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Signin from "./components/pages/users/signin";
import Signup from "./components/pages/users/signup";
import Dashboard from "./components/pages/requests/dashboard";
import MyActivities from "./components/pages/requests/myActivities";
import SingleRequest from "./components/pages/requests/singleRequest";
import Message from "./components/pages/requests/message";
import Messages from "./components/pages/requests/messages";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/me/dashboard" component={Dashboard} />
          <Route path="/users/activities" component={MyActivities} />
          <Route exact path="/request/:id/:title" component={SingleRequest} />
          <Route path="/users/messages" component={Messages} />
          <Route path="/message/:request_id/:user_id" component={Message} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
