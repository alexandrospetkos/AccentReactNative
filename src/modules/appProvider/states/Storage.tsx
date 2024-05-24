import React, {
  ReactNode,
  createContext,
  useContext,
} from 'react';

const StorageContext = createContext({});

type PropsType = {
  children: ReactNode;
};

export function StorageProvider({children}: PropsType) {
  const value = {

  };

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
}

type ContextValueType = {

};

export function useStorage() {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('useStorage must be used inside StorageProvider');
  }

  return context as ContextValueType;
}
