import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useCustomer } from "../context/CustomerProvider";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "./Main";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import AboutUs from "./AboutUs";

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
