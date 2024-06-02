import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from "./Pages/RegisterPage.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import DashboardLayout from "./Pages/Admin/DashboardLayout.jsx"
import Dashboard from "./Pages/Admin/Dashboard.jsx"
import Customers from "./Pages/Admin/Customers.jsx"
import Orders from "./Pages/Admin/Orders.jsx"
import Products from "./Pages/Admin/Products.jsx"
import Users from "./Pages/Admin/Users.jsx"
import HomePage from "./Pages/HomePage.jsx"
// import HomePage from "./Pages/HomePage.jsx"
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
