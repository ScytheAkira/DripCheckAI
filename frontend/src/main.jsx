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
//Private Route
import PrivateRoute from './components/PrivateRoute.jsx'

//Auth
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'


import Profile from './pages/user/Profile.jsx'

import AdminRoute from './pages/admin/AdminRoute.jsx'
import UserList from './pages/admin/UserList.jsx'
import CategoryList from './pages/admin/CategoryList.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import AllProducts from './pages/admin/AllProducts..jsx'
import ProductUpdate from './pages/admin/ProductUpdate.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Shop from './pages/Shop.jsx'
import AdminBlog from './pages/admin/AdminBlog.jsx'
const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route path = '/login' element = {<Login />} />
        <Route path = '/register' element = {<Register />} />
       <Route index={true} path='/' element={<Home />} />
       <Route path='/favourite' element = {<Favorites />} />
       <Route path='/product/:id' element = {<ProductDetails />} />
       <Route path="/shop" element={<Shop />} />
        <Route path='' element = {<PrivateRoute />}>
          <Route path='/profile' element= {<Profile />} />
        </Route>

      //Admin Routes
        <Route path= "/admin" element={<AdminRoute />}>
          <Route path='blog' element={<AdminBlog />} />

            <Route path='userlist' element={<UserList />} />
            <Route path="categorylist" element={<CategoryList />} />
            <Route path="productlist" element={<ProductList />} />
            <Route path="allproductslist" element={<AllProducts />} />
            <Route path="product/update/:_id" element={<ProductUpdate />} />
        </Route>

      </Route>

    )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store = {store}>  
      <RouterProvider router = {router} />
  </Provider>


)