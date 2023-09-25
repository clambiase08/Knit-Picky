import React, { useState, ReactNode, useEffect } from "react";
import { Order } from "../types/types";

interface OrderContextProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  handleDeleteItem: (deletedItem: { id: number }) => void;
}

export const OrderContext = React.createContext<OrderContextProps>({
  orders: [],
  setOrders: () => {},
  handleDeleteItem: function (): void {
    throw new Error("Function not implemented.");
  },
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
      });
  }, []);

  const handleDeleteItem = (deletedItem: { id: number }) => {
    const updatedOrders: Order[] = [...orders];
    updatedOrders.forEach((order) => {
      order.orderitems = order.orderitems.filter(
        (item) => item.id !== deletedItem.id
      );
    });
    setOrders(updatedOrders);
  };

  const contextValue = {
    orders,
    setOrders,
    handleDeleteItem,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}
