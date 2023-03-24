import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/index.scss'

// context provider imports
import { UsersProvider } from './contexts/UsersContext'

createRoot(document.getElementById('root')).render(
  <UsersProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UsersProvider>
)
