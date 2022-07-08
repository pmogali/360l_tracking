import React, {createContext, useState} from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
  let [appFn, setAppFn] = useState({
    fnToUse: () => {
      console.log('Fn to use');
    },
  });
  return (
    <AppContext.Provider
      value={{
        appContext: {appFn, setAppFn},
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
