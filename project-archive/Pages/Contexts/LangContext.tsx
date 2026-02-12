import { createContext, useContext ,useState} from "react";
 export const lanContext=createContext<any>(null);

 export default function LangProvider({children}){
    const [language, setLanguage]=useState('en');
    return(
        <lanContext.Provider value={{language,setLanguage}}>
        {children}
        </lanContext.Provider>
    )
 }
