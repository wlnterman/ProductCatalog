import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Product/ProductList';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/Auth/AdminPanel';
import { getCurrentUser } from './services/authService';
import CreateProduct from './components/Product/CreateProduct';
import CreateCategory from './components/Category/CreateCategory';
import CategoryList from './components/Category/CategoryList';
import Navigation from './components/Navigation';
import AssignRole from './components/Auth/AssignRole';
import { AuthProvider } from './components/authContext';
import { UserRoles } from './types';


const App: React.FC = () => {
  const currentUser = getCurrentUser();

  
  return (
    <AuthProvider>
    <Router>
      <div className="App">
      <Navigation />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        
          <Route path="/products" element={<ProtectedRoute roles={[UserRoles.Administrator, UserRoles.AdvancedUser,]} ><ProductList /></ProtectedRoute>}/> 
          <Route path="/add-product" element={<ProtectedRoute  roles={[UserRoles.Administrator, UserRoles.AdvancedUser,]}><CreateProduct /></ProtectedRoute>}/>
          <Route path="/product/edit/:id" element={<ProtectedRoute roles={[UserRoles.Administrator]}><CreateProduct /></ProtectedRoute>}/> 
          <Route path="/categories" element={<ProtectedRoute roles={[UserRoles.Administrator]}><CategoryList /></ProtectedRoute>}/> 
          <Route path="/add-category" element={<ProtectedRoute roles={[UserRoles.Administrator]}><CreateCategory /></ProtectedRoute>}/>
          <Route path="/assign-role" element={<ProtectedRoute roles={[UserRoles.Administrator]}><AssignRole /></ProtectedRoute>}/>
          
          {/* {currentUser && currentUser === 'admin' && ( */}
          
            <Route path="/admin" element={<ProtectedRoute roles={[UserRoles.Administrator]}><AdminPanel /></ProtectedRoute>}/>
          {/* )} */}
          {/*
          //https://localhost:3000/
          {currentUser && currentUser.role === 'admin' && (
            <PrivateRoute path="/admin" component={AdminPanel} />
          )} */}
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
