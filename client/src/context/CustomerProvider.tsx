import React, { createContext, useContext, useState, ReactNode } from "react";

interface Customer {
  username: string;
  //   first_name?: string;
  //   last_name?: string;
  //   email: string;
  //   _password_hash: string;
  //   shipping_address?: string;
  //   billing_address?: string;
}

interface CustomerContextType {
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  fetchCustomer: () => void;
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
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((customer) => {
          setCustomer(customer);
          console.log(customer);
        });
      }
    });

  const contextValue = {
    customer,
    setCustomer,
    fetchCustomer,
  };

  return (
    <CustomerProviderContext.Provider value={contextValue}>
      {children}
    </CustomerProviderContext.Provider>
  );
};

export default CustomerProvider;
