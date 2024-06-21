import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
//import { getCurrentUser } from '../../services/authService';
import { Card, Col, Row, Space } from 'antd';

interface AuthContextType {
  currentUser: DecodedToken | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<DecodedToken | null>>;
}

interface DecodedToken {
    exp: number;
    iat: number;
    role: string;
    [key: string]: any;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<DecodedToken | null>(null);
  
  // currentUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  useEffect(() => {
    //const user = getCurrentUser();
    //setCurrentUser(user as any);
    /////fasfasfasf  as role
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

// export const useAuth = () => useContext(AuthContext);
export const useAuth333 = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
