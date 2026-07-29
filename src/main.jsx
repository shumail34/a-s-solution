import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from '@vercel/analytics'

// Initialize Vercel Speed Insights & Analytics immediately at app startup
injectSpeedInsights()
inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
