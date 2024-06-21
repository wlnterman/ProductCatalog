import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUserDecodedToken, logout, refreshToken } from '../../services/authService';
import { Col, Row } from 'antd';
import useIdleTimeout from './useIdleTimeout';

interface AuthContextType {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  login: (token: string) => void;
  logoutUser: () => void;
  isLoading: boolean;
  isTokenExpired: (token: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const idleTimeout = 1 * 60 * 1000; // 15 минут

  useEffect(() => {
    const token = getCurrentUserDecodedToken();
    if (token) {
      if (!isTokenExpired(token)) {
        //const user = extractRoleFromToken(token);
        const user = getCurrentUserDecodedToken();
        console.log("3333333333333333333");
        console.log(user);
        setCurrentUser(user);
      } else {
        //localStorage.removeItem('token');
        refreshToken().then((data) => {
          if (data.token) {
              //const user = extractRoleFromToken(data.token);
              
              const user = getCurrentUserDecodedToken();
              console.log("444444444444444444444444");
              console.log(user);
              //const user = jwtDecode(data.token);
              setCurrentUser(user);
          } else {
              logoutUser();
          }
      });
      }
    }
    setIsLoading(false);
  }, []);

  // кусок который к сожалению не чинит баг с запросом "при разлогине после 15 минут я логинюсь на одной вкладке и получаю доступ к системе, но на других вкладках остаюсь разлогиненым, в чём может быть проблема?"
  ///+
  //как сделать так, чтобы после повторного входа все другие вкладки, на которых пользователя разлогинило вели на те же маршруты
  // useEffect(() => {
  //   const handleStorageChange = (event: StorageEvent) => {
  //     console.log("event-------------------------");
  //       console.log(event);
  //     if (event.key === 'token') {
  //       const token = event.newValue;
  //       console.log("token-------------------------");
  //       console.log(token);
  //       if (token) {
  //         const user = extractRoleFromToken(token);
  //         setCurrentUser(user);
  //       } else {
  //         //setCurrentUser(null);
  //       }
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);
  //   return () => window.removeEventListener('storage', handleStorageChange);
  // }, []);

  const logoutUser = () => {
    logout()
    setCurrentUser(null);
  };

  //разлогин по времени (отключён)
  const resetTimer = useIdleTimeout(idleTimeout, logoutUser);


  const login = (token: string) => {
    //localStorage.setItem('token', token);
    ////localStorage.setItem('refreshToken', response.data.refreshToken);
    //const user = extractRoleFromToken(token);
    const user = getCurrentUserDecodedToken();
    setCurrentUser(user);
    resetTimer();

    //enableAutoLogout && resetTimer();
  };

  const isTokenExpired = (token: string) => {
    //const userToken = extractRoleFromToken(token);
    const userToken = getCurrentUserDecodedToken();
    const currentTime = Date.now() / 1000;
    return userToken.exp < currentTime;
  };  

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logoutUser, isLoading, isTokenExpired }}>
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