
import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from './../hooks/useLocalStorageState';

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
    // Get The System Theme and put it as a initial option for the user
    const initialState = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [isDarkMode, setIsDarkMode] = useLocalStorageState(initialState, "isDarkMode");

    useEffect(function () {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode')
        } else {
            document.documentElement.classList.add('light-mode')
            document.documentElement.classList.remove('dark-mode')
        }
    }, [isDarkMode])

    function toggelDarkMode() {
        setIsDarkMode(dark => !dark)
    }


    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggelDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode() {

    const context = useContext(DarkModeContext)
    if (!context === undefined) throw new Error('DarkModeContext was use outside the DarkModeProvider')
    return context
}



export { useDarkMode, DarkModeProvider }