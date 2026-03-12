import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Manrope", "Poppins", sans-serif' },
    h2: { fontFamily: '"Manrope", "Poppins", sans-serif' },
    h3: { fontFamily: '"Manrope", "Poppins", sans-serif' },
    h4: { fontFamily: '"Manrope", "Poppins", sans-serif' },
    h5: { fontFamily: '"Manrope", "Poppins", sans-serif' },
    h6: { fontFamily: '"Manrope", "Poppins", sans-serif' },
  },
  shape: {
    borderRadius: 16,
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
