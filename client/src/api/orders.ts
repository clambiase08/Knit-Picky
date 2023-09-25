import { Customer } from "../types/types";

export const fetchOrders = async () => {
  const response = await fetch("/orders");
  if (!response.ok) {
    throw new Error("Couldn't find orders");
  }
  const orders = await response.json();
  return orders;
};

export const updateOrderItems = async (
  updatedItem: {
    quantity: number;
    subtotal: number;
  },
  orderId: number,
  itemId: number
) => {
  const response = await fetch(`/orders/${orderId}/orderitems/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  });
  if (!response.ok) {
    throw new Error("Couldn't update order item");
  }
  const updatedOrderItem = await response.json();
  return updatedOrderItem;
};

export const deleteOrderItem = async (orderId: number, itemId: number) => {
  const response = await fetch(`/orders/${orderId}/orderitems/${itemId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete order item");
  }
};

export const updateOrderStatus = async (orderId: number) => {
  const response = await fetch(`/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "paid" }),
  });
  if (!response.ok) {
    throw new Error("Couldn't update order status");
  }
  const data = await response.json();
  return data;
};

export const handleCreateOrder = async (customer: Customer | null) => {
  const response = await fetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "created",
      customer_id: customer?.id,
    }),
  });
  if (!response.ok) {
    throw new Error("Couldn't create order");
  }
  const data = await response.json();
  return data;
};
