import { Button, Col, Divider, Row, Space } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUserToken, logout } from '../services/authService';
import { useAuth } from './authContext';


const Navigation: React.FC = () => {
  const navigate = useNavigate ();
  const { currentUser, setCurrentUser } = useAuth();
  console.log(currentUser)
  console.log(getCurrentUserToken())

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/products');
  };

  return (
    <>
      <Row style={{height:'30px', marginTop:"20px"}} > 
        <Col offset ={1}>
          <Space  direction='horizontal' split="/">
            {/* <Link to="/"><Button type="link">Home</Button></Link>
            <Link to="/products"><Button type="link">Products</Button></Link>
            <Link to="/categories"><Button type="link">Categories</Button></Link>
            ... <Link to="/add-product"><Button type="link">Add Product</Button></Link> 
            <Link to="/add-category"><Button type="link">Add Category</Button></Link>
            <Link to="/assign-role"><Button type="link">Assign Role</Button></Link>
            <Button type="link" onClick={handleLogout}>Logout</Button> */}

            <Link to="/"><Button type="link">Home</Button></Link>
            {currentUser && (
              <>
                <Link to="/products"><Button type="link">Products</Button></Link>
                <Link to="/categories"><Button type="link">Categories</Button></Link>
                {/* <Link to="/add-category"><Button type="link">Add Category</Button></Link> */}
                {/* <Link to="/assign-role"><Button type="link">Assign Role</Button></Link> */}
                <Button type="link" onClick={handleLogout}>Logout</Button>
              </>
            )}
            {!currentUser && (
              <>
                <Link to="/login"><Button type="link">Login</Button></Link>
                <Link to="/register"><Button type="link">Register</Button></Link>
              </>
            )}  
            </Space>
          </Col>
      </Row>
      <Divider orientation='center'></Divider>
    </>
  );
};

export default Navigation;