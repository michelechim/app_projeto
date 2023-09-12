/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Container, Image} from './styles';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {ClientContext} from '../../context/ClientProvider';
import {ApiContext} from '../../context/ApiProvider';

const Preload = ({navigation}) => {
  const {signIn, getUserCache, user} = useContext(AuthUserContext);
  const {getClients} = useContext(ClientContext);
  const {getApi} = useContext(ApiContext);
  

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

    return () => {
      unsubribeClients;
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
