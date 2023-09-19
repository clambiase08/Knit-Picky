import React, { useState, ReactNode, useEffect } from "react";
import { Style } from "../types/types";

interface BestSellersContextProps {
  bestsellers: Style[];
  setBestsellers: React.Dispatch<React.SetStateAction<Style[]>>;
}

export const BestSellerContext = React.createContext<BestSellersContextProps>({
  bestsellers: [],
  setBestsellers: () => {},
});

interface StyleProviderProps {
  children: ReactNode;
}

export default function StyleProvider({ children }: StyleProviderProps) {
  const [bestsellers, setBestsellers] = useState<Style[]>([]);

  useEffect(() => {
    fetch("/bestsellers")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Response not OK");
      })
      .then((styles) => {
        setBestsellers(styles);
      });
  }, []);

  const contextValue = {
    bestsellers,
    setBestsellers,
  };

  return (
    <BestSellerContext.Provider value={contextValue}>
      {children}
    </BestSellerContext.Provider>
  );
}
