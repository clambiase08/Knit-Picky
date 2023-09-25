import React, { useState, ReactNode, useEffect } from "react";
import { Order, OrderItem } from "../types/types";
import { fetchOrders } from "../api/orders";

interface OrderContextProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  handleDeleteItem: (deletedItem: { id: number }) => void;
  handleUpdateQty: (itemToUpdate: OrderItem, newQuantity: number) => void;
  handleUpdateOrderItems: (
    itemToUpdate: OrderItem,
    updatedItemFromServer: OrderItem,
    orderId: number
  ) => void;
  handleUpdateOrderStatus: (
    orders: Order[],
    orderId: number,
    data: Order
  ) => void;
  handleAddOrder: (data: Order) => void;
}

export const OrderContext = React.createContext<OrderContextProps>({
  orders: [],
  setOrders: () => {},
  handleDeleteItem: function (): void {
    throw new Error("Function not implemented.");
  },
  handleUpdateQty: function (): void {},
  handleUpdateOrderItems: function (): void {},
  handleUpdateOrderStatus: function (): void {},
  handleAddOrder: function (): void {},
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

  const handleUpdateQty = (itemToUpdate: OrderItem, newQuantity: number) => {
    const updatedOrders: Order[] = [...orders];
    updatedOrders.forEach((order) => {
      order.orderitems = order.orderitems.map((item) =>
        item.id === itemToUpdate.id ? { ...item, quantity: newQuantity } : item
      );
    });
    setOrders(updatedOrders);
  };

  const handleUpdateOrderItems = (
    itemToUpdate: OrderItem,
    updatedItemFromServer: OrderItem,
    orderId: number
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderitems: order.orderitems.map((item) =>
                item.id === itemToUpdate.id
                  ? { ...item, ...updatedItemFromServer }
                  : item
              ),
            }
          : order
      )
    );
  };

  const handleUpdateOrderStatus = (
    orders: Order[],
    orderId: number,
    data: Order
  ): void => {
    setOrders(orders.map((order) => (order.id === orderId ? data : order)));
  };

  const handleAddOrder = (data: Order) => {
    setOrders((prevOrders) => [...prevOrders, data]);
  };

  const contextValue = {
    orders,
    setOrders,
    handleDeleteItem,
    handleUpdateQty,
    handleUpdateOrderItems,
    handleUpdateOrderStatus,
    handleAddOrder,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}
