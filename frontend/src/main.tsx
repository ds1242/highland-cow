import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import ScanPage from './pages/ScanPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />

        <Route path="scan" >
          <Route index element={<ScanPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
