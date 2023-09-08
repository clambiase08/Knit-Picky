import React, { useState, ReactNode, useEffect } from "react";

interface Styles {
  styles: Styles[];
  setStyles: React.Dispatch<React.SetStateAction<Styles[]>>;
}

export const StyleContext = React.createContext<Styles[]>([]);

interface StyleProviderProps {
  children: ReactNode;
}

export default function StyleProvider({ children }: StyleProviderProps) {
  const [styles, setStyles] = useState<Styles[]>([]);

  useEffect(() => {
    fetch("/styles")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((styles) => setStyles(styles));
  }, []);

  console.log(styles);

  const contextValue = {
    styles,
    setStyles,
  };

  return (
    <StyleContext.Provider value={[contextValue]}>
      {children}
    </StyleContext.Provider>
  );
}
