import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassWord from '../screens/ForgotPassWord';
import Preload from '../screens/Preload';
import Stocks from '../screens/Stocks';
import Stock from '../screens/Stock';
import Clients from '../screens/Clients';
import Client from '../screens/Client';
import Users from '../screens/Users';
import User from '../screens/User';
import {COLORS} from '../assets/colors';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  const AppStack = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Estoques"
        screenOptions={{
          headerShown: 'true',
          headerStyle: {
            backgroundColor: COLORS.primary,
            paddingRight: 5,
          },
          headerTintColor: COLORS.white,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Estoques"
          component={Stocks}
          options={stocksStyle}
        />
        <Drawer.Screen name="Estoque" component={Stock} options={stockStyle} />
        <Drawer.Screen
          name="Clientes"
          component={Clients}
          options={clientsStyle}
        />
        <Drawer.Screen
          name="Cliente"
          component={Client}
          options={clientStyle}
        />
        <Drawer.Screen name="Usuários" component={Users} options={usersStyle} />
        <Drawer.Screen name="Usuário" component={User} options={userStyle} />
      </Drawer.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen
          name="Preload"
          component={Preload}
          options={preloadStyle}
        />
        <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
        <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
        <Stack.Screen
          name="ForgotPassWord"
          component={ForgotPassWord}
          options={forgotPassWordStyle}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;

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

const preloadStyle = {
  headerShown: false,
};

const stocksStyle = {
  title: 'Estoques',
};
const stockStyle = {
  title: 'Estoque',
};
const clientsStyle = {
  title: 'Clientes',
};
const clientStyle = {
  title: 'Cliente',
};
const usersStyle = {
  title: 'Usuários',
};

const userStyle = {
  title: 'Usuário',
};
