import React, { useState, ReactNode, useEffect } from "react";

interface Order {
  id: number;
  customer_id: number;
  status: string;
  orderitems: [];
}

interface OrderContextProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrderContext = React.createContext<OrderContextProps>({
  orders: [],
  setOrders: () => {},
});

interface OrderProviderProps {
  children: ReactNode;
}

export default function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/orders")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Couldn't find orders");
      })
      .then((order) => {
        setOrders(order);
        // console.log(orderItems);
      });
  }, []);

  const contextValue = {
    orders,
    setOrders,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}
