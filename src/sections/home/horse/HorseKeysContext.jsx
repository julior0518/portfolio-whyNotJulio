import { createContext, useContext, useMemo, useRef } from "react";

const HorseKeysContext = createContext(null);

export function HorseKeysProvider({ children }) {
  const keysRef = useRef({ w: false, a: false, d: false });
  const value = useMemo(() => ({ keysRef }), []);
  return (
    <HorseKeysContext.Provider value={value}>
      {children}
    </HorseKeysContext.Provider>
  );
}

export function useHorseKeys() {
  const ctx = useContext(HorseKeysContext);
  if (!ctx) {
    throw new Error("useHorseKeys must be used within HorseKeysProvider");
  }
  return ctx.keysRef;
}
