import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

export const backendURL = 'https://project-assessment-1.onrender.com/api'

// export const backendURL = 'http://localhost:5000/api'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
