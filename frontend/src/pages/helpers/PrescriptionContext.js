// PrescriptionContext.js
import { createContext, useContext, useState } from 'react';

const PrescriptionContext = createContext();

export const usePrescriptionContext = () => {
  return useContext(PrescriptionContext);
};

export const PrescriptionProvider = ({ children }) => {
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  return (
    <PrescriptionContext.Provider value={{ prescriptionFile, setPrescriptionFile }}>
      {children}
    </PrescriptionContext.Provider>
  );
};
