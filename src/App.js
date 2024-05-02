import React from 'react'
import GlobalStyle from './styles/global'
import RoutesApp from './routes'
import { AuthProvider } from './contexts/auth'

// ao redor da aplicação temos o authProvider 
const App = () => {
    return (
        <AuthProvider>  
            <RoutesApp/>
            <GlobalStyle/>
        </AuthProvider>
    )
}

export default App