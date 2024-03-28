import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Policy } from "./pages/Policy";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { PageNotFound } from "./pages/PageNotFound";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { Dashboard } from "./pages/user/Dashboard";
import { PrivateRoute } from "./components/Routes/Private";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { AdminRoute } from "./components/Routes/AdminRoute";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { CreateCategory } from "./pages/Admin/CreateCategory";
import { CreateProduct } from "./pages/Admin/CreateProduct";
import { Users } from "./pages/Admin/Users";
import { Profile } from "./pages/user/Profile";
import { Orders } from "./pages/user/Orders";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route path="admin/create-category" element={<CreateCategory />}></Route>
          <Route path="admin/create-product" element={<CreateProduct />}></Route>
          <Route path="admin/users" element={<Users />}></Route>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} /> {/* For remaining all paths */}
      </Routes>
    </>
  );
}

export default App;