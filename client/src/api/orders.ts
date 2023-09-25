export const fetchOrders = async () => {
  const response = await fetch("/orders");
  if (!response.ok) {
    throw new Error("Couldn't find orders");
  }
  const orders = await response.json();
  return orders;
};
