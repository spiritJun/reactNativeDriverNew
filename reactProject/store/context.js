import React,{ createContext,useReducer  } from 'react';
import {initState,reducer} from './reducer';
export const TextContext = createContext(initState);
export function TextComponent(props){
    const [state,dispatch] = useReducer(reducer,initState);
    return (
      <TextContext.Provider value={{state,dispatch}}>
        {props.children}
      </TextContext.Provider>
    );
} 