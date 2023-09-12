import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassWord from '../screens/ForgotPassWord';
import Preload from '../screens/Preload';
import Clients from '../screens/Clients';
import Client from '../screens/Client';
import Users from '../screens/Users';
import User from '../screens/User';
import Products from '../screens/Products';
import Product from '../screens/Product';
import Consultor from '../screens/Consultor';
import Consultors from '../screens/Consultors';
import Catalogo from '../screens/Catalogo';
import Catalogos from '../screens/Catalogos';
import {COLORS} from '../assets/colors';
import CustomDrawerContent from '../components/CustomDrawerContent';
import LogoutButton from '../components/LogoutButton';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  const AppStack = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Consultors"
        screenOptions={{
          headerShown: 'true',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerRight: () => <LogoutButton />,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Products"
          component={Products}
          options={productsStyle}
        />
        <Drawer.Screen
          name="Product"
          component={Product}
          options={productStyle}
        />
        <Drawer.Screen
          name="Clients"
          component={Clients}
          options={clientsStyle}
        />
        <Drawer.Screen name="Client" component={Client} options={clientStyle} />
        <Drawer.Screen name="Users" component={Users} options={usersStyle} />
        <Drawer.Screen name="User" component={User} options={userStyle} />
        <Drawer.Screen
          name="Consultors"
          component={Consultors}
          options={consultorsStyle}
        />
        <Drawer.Screen
          name="Consultor"
          component={Consultor}
          options={consultorStyle}
        />
        <Drawer.Screen
          name="Catalogos"
          component={Catalogos}
          options={catalogosStyle}
        />
        <Drawer.Screen
          name="Catalogo"
          component={Catalogo}
          options={catalogoStyle}
        />
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
  title: 'Revenda Fácil', //'Chim - mãe & filha',
};

const signUpStyle = {
  title: 'Cadastra -se',
};

const forgotPassWordStyle = {
  title: 'Recuperar senha',
};

const preloadStyle = {
  headerShown: false,
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
const productStyle = {
  title: 'Produto',
};
const productsStyle = {
  title: 'Produtos',
};
const consultorStyle = {
  title: 'Consultor',
};
const consultorsStyle = {
  title: 'Consultores',
};
const catalogoStyle = {
  title: 'Catálogo'
};
const catalogosStyle = {
  title: 'Catálogos'
};