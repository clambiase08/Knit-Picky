import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import ShopAll from "./ShopAll";
import BestSellers from "./BestSellers";
import Yarns from "./Yarns";
import Accessories from "./Accessories";
import ProductDetailPage from "./ProductDetailPage";
import CustomerProfile from "./CustomerProfile";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";

export default function Main() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/shop-all">
        <ShopAll />
      </Route>
      <Route path="/bestsellers">
        <BestSellers />
      </Route>
      <Route path="/yarns">
        <Yarns />
      </Route>
      <Route path="/accessories">
        <Accessories />
      </Route>
      <Route path="/product/:id">
        <ProductDetailPage />
      </Route>
      <Route path="/profile/:name">
        <CustomerProfile />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/order-confirmed">
        <OrderConfirmation />
      </Route>
    </Switch>
  );
}
