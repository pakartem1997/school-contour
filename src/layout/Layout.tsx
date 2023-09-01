import React, { useEffect, useState } from 'react';
import Logo from './img/logo.svg';
import { RegistrationFormData, RegistrationModal } from '../components/RegistrationModal/RegistrationModal';
import { LoginFormData, LoginModal } from '../components/LoginModal/LoginModal';
import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import PeopleIcon from '../img/people.svg';
import { UserData } from '../api/Api.types';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import { Footer } from '../components/Footer/Footer';
import { SwitchTheme } from '../components/SwitchTheme/SwitchTheme';
import { ThemeContext } from '../components/ThemeContext/ThemeContext';

type Theme = 'dark' | 'light';

const getTheme = () => {
  return (localStorage.getItem('theme') as Theme) || 'light';
};

interface LayoutProps {
  userData: null | UserData;
  onLogin: (login: string, password: string) => Promise<void>;
  onRegister: (login: string, password: string) => Promise<void>;
}

export const Layout: React.FC<LayoutProps> = ({ children, userData, onLogin, onRegister }) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayRegistration, setDisplayRegistration] = useState(false);
  const [theme, setTheme] = useState<Theme>(getTheme());

  const navigate = useNavigate();
  const currentURL = useLocation();

  useEffect(() => {
    if (userData?.login) {
      navigate('/');
    }
  }, [userData?.login]);

  const handleRegister = async (data: RegistrationFormData) => {
    await onRegister(data.email, data.password);
    setDisplayRegistration(false);
  };
  const handleLogin = async (data: LoginFormData) => {
    await onLogin(data.email, data.password);
    setDisplayLogin(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className={styles.app}>
        <div className={styles.header}>
          <header className={styles.content}>
            <a onClick={() => navigate('/')}>
              <Logo className={styles.logo} />
            </a>
            <div className={styles.headerButtons}>
              {!userData?.login && (
                <>
                  <Button onClick={() => setDisplayLogin(true)}>Войти</Button>
                  <Button light onClick={() => setDisplayRegistration(true)}>
                    Регистрация
                  </Button>
                </>
              )}
              {userData?.login && (
                <>
                  <a className={styles.books} onClick={() => navigate('/booking')}>
                    Мои бронирования
                  </a>
                  <Dropdown.Wrapper
                    title={
                      <span className={styles.login}>
                        <PeopleIcon className={styles.peopleIcon} />
                        &nbsp;
                        {userData.login || 'Unknown'}
                      </span>
                    }
                  >
                    {/* eslint-disable-next-line no-console */}
                    <Dropdown.Item onClick={() => console.log('redirect to settings')}>Настройки</Dropdown.Item>
                  </Dropdown.Wrapper>
                </>
              )}
              <SwitchTheme />
            </div>
            {displayLogin && (
              <LoginModal
                onLogin={handleLogin}
                onClose={() => setDisplayLogin(false)}
                onRegistrClick={() => setDisplayRegistration(true)}
              />
            )}
            {displayRegistration && (
              <RegistrationModal
                onRegister={handleRegister}
                onClose={() => setDisplayRegistration(false)}
                onLoginClick={() => setDisplayLogin(true)}
              />
            )}
          </header>
        </div>

        <div className={styles.main}> {!userData?.login && currentURL.pathname !== '/' ? navigate('/') : children}</div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};
