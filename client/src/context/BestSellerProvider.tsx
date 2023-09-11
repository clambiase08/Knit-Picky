import React, { useState, ReactNode, useEffect } from "react";

interface Style {
  id: number;
  style_name: string;
  description?: string;
  price: number;
  stock_quantity?: number;
  category_id?: number;
  skus: Skus[];
}

interface Skus {
  color_id: number;
  id: number;
  image: string;
  sku: string;
  style_id: number;
}

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
        // console.log(styles);
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
