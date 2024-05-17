import {Outlet} from 'react-router-dom'
import Navigation from './pages/auth/Navigation.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
// import './index.css'

function App() {

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className='py-3'>
        <Outlet />

      </main>
    
    
    
    
    </>
  )
}

export default App
