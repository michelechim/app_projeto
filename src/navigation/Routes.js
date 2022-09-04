/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthUserContext} from '../context/AuthUserProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {COLORS} from '../assets/colors';

export default function Routes() {
  const {user, setUser} = useContext(AuthUserContext);

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      authUser ? setUser(authUser) : setUser(null);
    });
    return unsubscriber;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
