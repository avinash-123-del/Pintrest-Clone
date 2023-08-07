'use client'
import React, { createContext, useState } from "react";
export const AppContext = createContext();

function AppContextProvider({ children }) {
    
  const [search, setSearch] = useState('');

  const value = { search, setSearch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
