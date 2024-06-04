import { Routes, Route, useLocation } from 'react-router-dom'
import RegisterPage from "./Pages/RegisterPage.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import DashboardLayout from "./Pages/Admin/DashboardLayout.jsx"
import Dashboard from "./Pages/Admin/Dashboard.jsx"
import Customers from "./Pages/Admin/Customers.jsx"
import Orders from "./Pages/Admin/Orders.jsx"
import Products from "./Pages/Admin/Products.jsx"
import Users from "./Pages/Admin/Users.jsx"
import HomePage from "./Pages/HomePage.jsx"
import About from "./Pages/About.jsx"
import Shop from "./Pages/Shop.jsx"
import Contact from "./Pages/Contact.jsx"
// import HomePage from "./Pages/HomePage.jsx"
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx'
function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* admin routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
