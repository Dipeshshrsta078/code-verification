import React, { createContext, useState, useEffect } from 'react';

export const VerifiedContext = createContext();

export const VerifiedProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false); 
  return (
    <VerifiedContext.Provider value={{ isVerified, setIsVerified}}>
      {children}
    </VerifiedContext.Provider>
  );
};