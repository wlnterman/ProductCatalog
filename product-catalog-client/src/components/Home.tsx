import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import { useNavigate  } from 'react-router-dom';
import { Image } from 'antd';

const Home: React.FC = () => {
    const currentUser = getCurrentUser();
    
    console.log(currentUser); 
    // "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    // console.log(currentUser["\"http://schemas.microsoft.com/ws/2008/06/identity/claims/role\""]); 

  return (
    <div style={{backgroundImage : "https://www.simplilearn.com/ice9/free_resources_article_thumb/The_Top_30_Important_Cloud_Computing_Terms.jpg"}}>
      <h1>Welcome to the Product Catalog!</h1>
      <h2>Find whatever you need here!</h2>
      <Image width="100%" src="https://www.simplilearn.com/ice9/free_resources_article_thumb/The_Top_30_Important_Cloud_Computing_Terms.jpg"></Image>
      <p>
        {!getCurrentUser() ? 
        (
            <>
              <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
            </>
        ) : (
            <>
                

            </> 
          ) }
      </p>
    </div>
  );
};

export default Home;