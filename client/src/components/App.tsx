import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useCustomer } from "../context/CustomerProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Main from "./Main";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import AboutUs from "./AboutUs";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Nuhq2LA3zgRC9JMJCOvNMSCNKOLxDzXkI1vwvfqaU2IeXx4XXKNcjTB7Mn20Tt2H27LDYlH8f3t2oh57A6FDnHZ00f50SquXk"
);

function App() {
  const { fetchCustomer } = useCustomer();
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const showCheckoutForm = location.pathname === "/checkout";

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  type Theme = "night" | "stripe" | "flat";

  const appearance: { theme: Theme } = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <ChakraProvider>
      <Main />
      <NavBar />
      {showCheckoutForm && clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
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
