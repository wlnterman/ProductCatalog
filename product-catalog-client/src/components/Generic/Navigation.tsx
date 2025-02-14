import { Button, Col, Divider, Row, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext2";
import { UserRoles } from "../../types";
//123import { useAuth } from './authContext';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate("/products");
  };

  return (
    <>
      <Row style={{ height: "30px", marginTop: "20px" }}>
        <Col offset={1}>
          <Space direction="horizontal" split="/">
            {/* <Link to="/"><Button type="link">Home</Button></Link> */}
            {currentUser && (
              <>
                <Link to="/">
                  <Button type="link">Home</Button>
                </Link>
                <Link to="/liveChart">
                  <Button type="link">LiveChart</Button>
                </Link>
                <Link to="/products">
                  <Button type="link">Products</Button>
                </Link>
                <Link to="/products2">
                  <Button type="link">Products2</Button>
                </Link>
                {currentUser && currentUser.role !== UserRoles.User && (
                  <Link to="/categories">
                    <Button type="link">Categories</Button>
                  </Link>
                )}
                {/* <Link to="/add-category"><Button type="link">Add Category</Button></Link>  */}
                {/* <Link to="/assign-role"><Button type="link">Assign Role</Button></Link> */}
                {currentUser && currentUser.role === UserRoles.Administrator && (
                  <Link to="/admin">
                    <Button type="link">Admin</Button>
                  </Link>
                )}
                {/* <Link to="/product/edit/:id"><Button type="link">product/edit/:id</Button></Link> */}
                <Link to="/user-profile">
                  <Button type="link">{`${currentUser.FirstName} ${currentUser.LastName}`}</Button>
                </Link>
                <Button type="link" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            {!currentUser && (
              <>
                <Link to="/login">
                  <Button type="link">Login</Button>
                </Link>
                <Link to="/register">
                  <Button type="link">Register</Button>
                </Link>
              </>
            )}
          </Space>
        </Col>
      </Row>
      <Divider orientation="center"></Divider>
    </>
  );
};

export default Navigation;
