import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useCustomer } from "../context/CustomerProvider";
import Main from "./App/Main";
import NavBar from "./App/NavBar";
import Login from "./App/Login";
import Logout from "./App/Logout";
import Signup from "./App/Signup";
import Contact from "./App/Contact";
import AboutUs from "./App/AboutUs";

function App() {
  const { fetchCustomer } = useCustomer();

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <Switch>
      <Main />
      <NavBar />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Contact />
      <AboutUs />
    </Switch>
  );
}

export default App;
