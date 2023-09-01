import React, { useState, useEffect } from 'react';
import { Layout } from './layout';
import { Router } from './Router';
import { api } from './api';
import { UserData } from './api/Api.types';
import classes from './App.module.css';
import { YMapsContextProvider } from './components/YMapsContext';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  const [userData, setUserData] = useState<null | UserData>(null);
  const [loading, setLoading] = useState(true);

  const loadCurrentUser = async () => {
    setLoading(true);
    const data = await api.user.getCurrentUser();

    if (data?.login) {
      setUserData({ login: data.login, cardRequisites: data.cardRequisites });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const onRegister = async (login: string, password: string) => {
    await api.user.register(login, password);
    loadCurrentUser();
  };

  const onLogin = async (login: string, password: string) => {
    await api.user.login(login, password);
    loadCurrentUser();
  };

  if (loading) {
    return <div className={classes.loader}>Загружаем сервис...</div>;
  }

  return (
    <YMapsContextProvider>
      <BrowserRouter>
        <Layout userData={userData} onRegister={onRegister} onLogin={onLogin}>
          <Router />
        </Layout>
      </BrowserRouter>
    </YMapsContextProvider>
  );
};
