import React, { useEffect, useState, ReactNode } from "react";
import { Color } from "../types/types";

interface ColorContextProps {
  colors: Color[];
  setColors: React.Dispatch<React.SetStateAction<Color[]>>;
}

export const ColorContext = React.createContext<ColorContextProps>({
  colors: [],
  setColors: () => {},
});

interface ColorProviderProps {
  children: ReactNode;
}

export default function ColorProvider({ children }: ColorProviderProps) {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    fetch("/colors")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Response not OK");
      })
      .then((color) => {
        setColors(color);
        // console.log(colors);
      });
  }, []);

  const contextValue = {
    colors,
    setColors,
  };

  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
}
