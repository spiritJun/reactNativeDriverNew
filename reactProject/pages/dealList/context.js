import React,{ createContext  } from 'react';
export const DealContext = createContext({});
export function DealComponent(props){
  const {state,updateState} = props;
    return (
      <DealContext.Provider value={{state,updateState}}>
        {props.children}
      </DealContext.Provider>
    );
} 