import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import store  from './Redux/Store/store.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)