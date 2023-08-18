/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Container, Image} from './styles';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {ClientContext} from '../../context/ClientProvider';
import {StockContext} from '../../context/StockProvider';
import {ApiContext} from '../../context/ApiProvider';
import {CompanyContext} from '../../context/CompanyProvider';

const Preload = ({navigation}) => {
  const {signIn, getUserCache, user} = useContext(AuthUserContext);
  const {getClients} = useContext(ClientContext);
  const {getStocks} = useContext(StockContext);
  const {getApi} = useContext(ApiContext);
  const {getCompanies} = useContext(CompanyContext);

  const loginUser = async () => {
    const userLocal = await getUserCache();
    console.log(userLocal);
    if (userLocal) {
      signIn(userLocal.email, userLocal.pass);
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    }
  }, [user]);

  useEffect(() => {
    loginUser();
    Icon.loadFont(); // tem que ler os icons da fonte ao inicializar o app
    getApi(); // obtem o objeto de acesso a API REST (firebase)
    const unsubribeClients = getClients(); // faz cache dos clientes
    const unsubribeStocks = getStocks(); // faz cache do estoque
    const unsubribeCompanies = getCompanies();

    return () => {
      unsubribeClients;
      unsubribeStocks;
      unsubribeCompanies;
    };
  }, []);

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilitylabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
