import { Customer } from "../types/types";

export const getCustomer = async () => {
  const response = await fetch("/check_session");
  if (!response.ok) {
    throw new Error("Couldn't find orders");
  }
  const customer = await response.json();
  return customer;
};

export const fetchLogout = async () => {
  const response = await fetch("/logout", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Couldn't logout");
  }
};

export const fetchLogin = async (values: Customer, authType: string) => {
  const endpoint = authType === "signup" ? "/signup" : "/login";

  const response = await fetch(`${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new Error("Couldn't login");
  }
  const customer = await response.json();
  return customer;
};
