import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useCustomer } from "../context/CustomerProvider";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "./App/Main";
import NavBar from "./App/NavBar";
import Login from "./App/Login";
import Signup from "./App/Signup";
import AboutUs from "./App/AboutUs";

function App() {
  const { fetchCustomer } = useCustomer();

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <ChakraProvider>
      <Main />
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/About">
          <AboutUs />
        </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
