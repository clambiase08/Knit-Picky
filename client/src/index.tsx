import React from "react";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import CustomerProvider from "./context/CustomerProvider";
import StyleProvider from "./context/StyleProvider";
import ColorProvider from "./context/ColorProvider";
import OrderProvider from "./context/OrderItemProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerProvider>
        <StyleProvider>
          <ColorProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </ColorProvider>
        </StyleProvider>
      </CustomerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
