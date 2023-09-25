import React, { createContext, useContext, useState, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { Customer } from "../types/types";

export interface CustomerContextType {
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  fetchCustomer: () => void;
  handleLogin: (values: Customer, authType: string) => void;
  handleLogout: () => void;
  handleDeleteItem: (deletedItemId: number) => void;
}

interface CustomerProviderProps {
  children: ReactNode;
}

const CustomerProviderContext = createContext<CustomerContextType | null>(null);

export const useCustomer = (): CustomerContextType => {
  const context = useContext(CustomerProviderContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  const fetchCustomer = () =>
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Failed to fetch customer data");
        }
      })
      .then((customer) => {
        setCustomer(customer);
      })
      .catch((error) => {
        console.error(error);
      });

  const handleLogin = async (values: Customer, authType: string) => {
    const endpoint = authType === "signup" ? "/signup" : "/login";

    const response = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      response.json().then((customer) => setCustomer(customer));
    }
  };

  const history = useHistory();

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setCustomer(null);
        history.push("/");
      }
    });
  };

  const handleDeleteItem = (deletedItemId: number): void => {
    setCustomer({
      ...customer,
      wishlist_items: customer!.wishlist_items?.filter(
        (item) => item.id !== deletedItemId
      ),
    });
  };

  const contextValue = {
    customer,
    setCustomer,
    fetchCustomer,
    handleLogin,
    handleLogout,
    handleDeleteItem,
  };

  return (
    <CustomerProviderContext.Provider value={contextValue}>
      {children}
    </CustomerProviderContext.Provider>
  );
};

export default CustomerProvider;
