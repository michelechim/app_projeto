/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Container, Image} from './styles';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {ClientContext} from '../../context/ClientProvider';

const Preload = ({navigation}) => {
  const {setUser} = useContext(AuthUserContext);
  const {getClients} = useContext(ClientContext);

  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log('getUserCache');
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Home: erro em getUserCache: ' + e);
    }
  };

  const loginUser = async () => {
    const user = await getUserCache();
    setUser(user);
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
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
    loginUser();
    Icon.loadFont(); // tem que ler os icons da fonte ao inicializar o app
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
