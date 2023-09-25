import React, { useEffect, useState, ReactNode } from "react";
import { Color } from "../types/types";
import { getColors } from "../api/colors";

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
    getColors().then((color) => {
      setColors(color);
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
