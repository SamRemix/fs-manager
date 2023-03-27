import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/index.scss'

// context provider imports
import { AuthProvider } from './contexts/AuthContext'
import { UsersProvider } from './contexts/UsersContext'
import { ToastsProvider } from './contexts/ToastsContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <UsersProvider>
      <ToastsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastsProvider>
    </UsersProvider>
  </AuthProvider>
)
