import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Main/Home";
import ShopAll from "../Main/Categories/ShopAll";
import BestSellers from "../Main/Categories/BestSellers";
import Yarns from "../Main/Categories/Yarns";
import Accessories from "../Main/Categories/Accessories";
import ProductDetailPage from "../Main/ProductDetailPage";
import CustomerProfile from "../Main/CustomerProfile";
import Cart from "../Main/Cart";
import Checkout from "../Main/Checkout";
import OrderConfirmation from "../Main/OrderConfirmation";

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
      <Route path="/cart/checkout">
        <Checkout />
      </Route>
      <Route path="/confirmation">
        <OrderConfirmation />
      </Route>
    </Switch>
  );
}
