import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {COLORS} from '../assets/colors';
import Preload from '../screens/Preload';
import Stocks from '../screens/Stocks';
import Stock from '../screens/Stock';
import Clients from '../screens/Clients';
import Client from '../screens/Client';
import Users from '../screens/Users';
import User from '../screens/User';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Preload">
      <Stack.Screen name="Preload" component={Preload} options={preloadStyle} />
      <Stack.Screen name="Estoques" component={Stocks} options={stocksStyle} />
      <Stack.Screen name="Estoque" component={Stock} options={stockStyle} />
      <Stack.Screen
        name="Clientes"
        component={Clients}
        options={clientsStyle}
      />
      <Stack.Screen name="Cliente" component={Client} options={clientStyle} />
      <Stack.Screen name="Usuários" component={Users} options={usersStyle} />
      <Stack.Screen name="Usuário" component={User} options={userStyle} />
    </Stack.Navigator>
  );
};

export default AppStack;

const preloadStyle = {
  headerShown: false,
};

const stocksStyle = {
  title: 'Estoques',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};
const stockStyle = {
  title: 'Estoque',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};
const clientsStyle = {
  title: 'Clientes',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};
const clientStyle = {
  title: 'Cliente',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};
const usersStyle = {
  title: 'Usuários',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};

const userStyle = {
  title: 'Usuário',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitle: {color: COLORS.white},
  headerTintColor: {color: COLORS.white},
};
