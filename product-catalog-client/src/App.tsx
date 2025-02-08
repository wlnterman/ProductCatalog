import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProductList from "./components/Product/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./components/Auth/AdminPanel";
import CreateProduct from "./components/Product/CreateProduct";
import CreateCategory from "./components/Category/CreateCategory";
import CategoryList from "./components/Category/CategoryList";
import Navigation from "./components/Navigation";
//123import { AuthProvider } from './components/authContext';
import { UserRoles } from "./types";
import { AuthProvider, useAuth } from "./components/Context/authContext2";
import UserProfile from "./components/UserProfile";
import PaymentsView from "./components/payments/PaymentsView";
import ApartmentList from "./components/Apartment/ApartmentList";
import ApartmentList2 from "./components/Apartment/ApartmentGridView";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/login" element={<LoginRedirect />} />
            {/* <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} /> */}

            {/* <Route element={<ProtectedRoute />}>
                        <Route path="/products" element={<ProductList />} />
                        Другие защищенные маршруты
                    </Route> */}
            <Route path="/user-profile" element={<UserProfile />} />
            <Route
              path="/"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator, UserRoles.AdvancedUser, UserRoles.User]}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator, UserRoles.AdvancedUser, UserRoles.User]}>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator, UserRoles.AdvancedUser]}>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/edit/:id"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator]}>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator, UserRoles.AdvancedUser, UserRoles.User]}>
                  <CategoryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apartments"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator, UserRoles.AdvancedUser, UserRoles.User]}>
                  <ApartmentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-category"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator]}>
                  <CreateCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator, UserRoles.AdvancedUser, UserRoles.User]}>
                  <PaymentsView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={[UserRoles.Administrator]}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const LoginRedirect: React.FC = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" /> : <Login />;
};

export default App;
