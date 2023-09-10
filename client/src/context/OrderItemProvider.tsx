import React, { useState, ReactNode, useEffect } from "react";

interface OrderItem {
  id: number;
  order: {
    customer_id: number;
    status: string;
  };
  order_id: number;
  quantity: number;
  sku_id: number;
  style_id: number;
  subtotal: number;
  style: {
    category_id: number;
    description: string;
    id: number;
    price: number;
    stock_quantity: number;
    style_name: string;
  };
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

export default function OrderItemProvider({
  children,
}: OrderItemProviderProps) {
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
        // console.log(orderItems);
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
