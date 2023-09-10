import React, { useState, ReactNode, useEffect } from "react";

interface OrderItem {
  id: number;
  quantity: number;
  subtotal: number;
  order_id: number;
  style_id: number;
}

interface OrderItemsContextProps {
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

export const OrderItemContext = React.createContext<OrderItemsContextProps>({
  orderItems: [],
  setOrderItems: () => {},
});

interface OrderItemProviderProps {
  children: ReactNode;
}

export default function OrderProvider({ children }: OrderItemProviderProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetch("/order_items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Couldn't find order items");
      })
      .then((orderItems) => {
        setOrderItems(orderItems);
        console.log(orderItems);
      });
  }, []);

  const contextValue = {
    orderItems,
    setOrderItems,
  };

  return (
    <OrderItemContext.Provider value={contextValue}>
      {children}
    </OrderItemContext.Provider>
  );
}
