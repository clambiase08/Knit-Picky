import React, { useState, ReactNode, useEffect } from "react";
import { Style } from "../types/types";

interface StylesContextProps {
  styles: Style[];
  setStyles: React.Dispatch<React.SetStateAction<Style[]>>;
}

export const StyleContext = React.createContext<StylesContextProps>({
  styles: [],
  setStyles: () => {},
});

interface StyleProviderProps {
  children: ReactNode;
}

export default function StyleProvider({ children }: StyleProviderProps) {
  const [styles, setStyles] = useState<Style[]>([]);

  useEffect(() => {
    fetch("/styles")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Response not OK");
      })
      .then((styles) => {
        setStyles(styles);
        // console.log(styles);
      });
  }, []);

  const contextValue = {
    styles,
    setStyles,
  };

  return (
    <StyleContext.Provider value={contextValue}>
      {children}
    </StyleContext.Provider>
  );
}
