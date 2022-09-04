import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassWord from '../screens/ForgotPassWord';
import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
      <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
      <Stack.Screen
        name="ForgotPassWord"
        component={ForgotPassWord}
        options={forgotPassWordStyle}
      />
    </Stack.Navigator>
  );
}
const signInStyle = {
  title: 'Chim - mãe & filha',
  //  title: 'Bem vindo ao aplicativo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
};

const signUpStyle = {
  title: 'Cadastra -se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};

const forgotPassWordStyle = {
  title: 'Recuperar senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};
