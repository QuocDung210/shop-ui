import { createContext, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [render, setRender] = useState(false);
    const handleReRender = () => {
        setRender(!render);
    };
    return <AppContext.Provider value={{ render, handleReRender }}>{children}</AppContext.Provider>;
};
