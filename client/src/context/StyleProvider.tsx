import React, { useState, ReactNode, useEffect } from "react";
import { Style } from "../types/types";
import { getStyles } from "../api/styles";

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
    getStyles().then((styles) => {
      setStyles(styles);
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
