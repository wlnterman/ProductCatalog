import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
//import jwtDecode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import { getCurrentUserToken } from '../services/authService';
import { Col, Row } from 'antd';

interface AuthContextType {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const extractRoleFromToken = (token: string) => {
  const decodedToken: any = jwtDecode(token);
  const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  return { ...decodedToken, role };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const token = getCurrentUserToken();
    if (token) {
      const user = extractRoleFromToken(token);
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        <Row justify="center" style={{backgroundColor: '#f2f4f5', height:'100vh'}}   >
            <Col style={{width:"95%"}} > 
                {children}
            </Col>
        </Row>
    </AuthContext.Provider>
  );
};

//export const useAuth222 = () => useContext(AuthContext);
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };