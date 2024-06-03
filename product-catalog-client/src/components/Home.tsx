import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import { useNavigate  } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate ();

    const handleLogout = () => {
      logout();
      navigate('/');
    };

    const currentUser = getCurrentUser();
    
    console.log(currentUser); 
    // "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    // console.log(currentUser["\"http://schemas.microsoft.com/ws/2008/06/identity/claims/role\""]); 

  return (
    <div>
      <h2>Welcome to the Product Catalog</h2>
      <p>
        {!getCurrentUser() ? 
        (
            <>
              <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
            </>
        ) : (
            <>
                {/* <Link to="/product/edit/:id">/products/edit/:id</Link>
                <Link to="/admin">/admin</Link> */}

            </> 
          ) }
      </p>
    </div>
  );
};

export default Home;