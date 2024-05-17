import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, 
        RouterProvider, 
        createRoutesFromElements, 
        createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/auth/Login.jsx'





const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route path = '/login' element = {<Login />} />
      </Route>

    )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store = {store}>  
      <RouterProvider router = {router} />
  </Provider>


)