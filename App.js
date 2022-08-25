import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/colors';
import ForgotPassWord from './src/screens/ForgotPassWord';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassWord}
          options={forgotPassWordStyle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const signInStyle = {
  title: 'Chim - mãe & filha',
  //  title: 'Bem vindo ao aplicativo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
};
const forgotPassWordStyle = {
  title: 'Recuperar senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};
const signUpStyle = {
  title: 'Cadastra -se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};
