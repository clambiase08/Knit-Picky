import React, { useState, ReactNode, useEffect } from "react";
import { Order } from "../types/types";
import { fetchOrders } from "../api/orders";

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
    fetchOrders().then((order) => {
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
