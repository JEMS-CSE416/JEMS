import React, { createContext, useContext, ReactNode, useState } from "react";

interface LegendContextProps {
  children: ReactNode;
}

interface LegendContextValue {
  validChoroplethLegend: boolean;
  setvalidChoroplethLegend: React.Dispatch<React.SetStateAction<boolean>>;
  legendSubmit: boolean;
  setLegendSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const LegendContext = createContext<LegendContextValue | undefined>(undefined);

export function LegendContextProvider({ children }: LegendContextProps) {
  const [legendSubmit, setLegendSubmit] = useState(false);
  const [validChoroplethLegend, setvalidChoroplethLegend] = useState(true);

  const contextValue = {
    validChoroplethLegend,
    setvalidChoroplethLegend,
    legendSubmit,
    setLegendSubmit,
  };

  return (
    <LegendContext.Provider value={contextValue}>
      {children}
    </LegendContext.Provider>
  );
}

export function useLegendContext() {
  const context = useContext(LegendContext);

  if (!context) {
    throw new Error(
      "useLegendContext must be used within a LegendContextProvider"
    );
  }

  return context;
}
