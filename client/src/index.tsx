import React from "react";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import CustomerProvider from "./context/CustomerProvider";
import StyleProvider from "./context/StyleProvider";
import ColorProvider from "./context/ColorProvider";
import OrderItemProvider from "./context/OrderItemProvider";
import OrderProvider from "./context/OrderProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerProvider>
        <OrderProvider>
          <StyleProvider>
            <ColorProvider>
              <OrderItemProvider>
                <App />
              </OrderItemProvider>
            </ColorProvider>
          </StyleProvider>
        </OrderProvider>
      </CustomerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
