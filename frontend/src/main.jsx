import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './componenets/Navbar.jsx'
import Footer from './componenets/Footer.jsx'
import { AuthProvider } from './componenets/AuthContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <main className='flex flex-col min-h-screen'>
    <BrowserRouter>
    <AuthProvider>
    
      <Navbar/>
      <div className='flex-grow'>
        <div className=''>
          <Toaster  
           position="bottom-right"
          reverseOrder={false}/>
        </div>
       <App />
        </div>
       <Footer/>
   </AuthProvider>
    </BrowserRouter>
  </main>
  </StrictMode>
  ,
)
