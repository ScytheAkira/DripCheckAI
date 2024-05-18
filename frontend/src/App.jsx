import {Outlet} from 'react-router-dom'
import Navigation from './pages/auth/Navigation.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
// import './index.css'

function App() {

  return (
    <>
      <div className="min-h-screen bg-primary">
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
      </div>
    
    
    </>
  )
}

export default App
