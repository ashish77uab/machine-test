import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
 import { ToastContainer, toast } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>



      <App />
    </Provider>,
  </StrictMode>,
)
