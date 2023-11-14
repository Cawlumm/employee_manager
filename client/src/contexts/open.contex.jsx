// OpenContext.js
import { createContext, useContext, useState } from 'react';

const OpenContext = createContext();

export const OpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </OpenContext.Provider>
  );
};

export const useOpen = () => {
  return useContext(OpenContext);
};
