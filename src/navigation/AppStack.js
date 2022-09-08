import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {COLORS} from '../assets/colors';
import Preload from '../screens/Preload';
import Stocks from '../screens/Stocks';
import Stock from '../screens/Stock';
import Clients from '../screens/Clients';
import Client from '../screens/Client';
import Users from '../screens/Users';
import User from '../screens/User';
import LogoutButton from '../components/LogoutButton';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: 'true',
        headerStyle: {
          backgroundColor: COLORS.primary,
          paddingRight: 5,
        },
        headerTintColor: COLORS.white,
        headerRight: () => <LogoutButton />,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Preload"
        component={Preload}
        options={preloadStyle}
      />
      <Drawer.Screen name="Estoques" component={Stocks} options={stocksStyle} />
      <Drawer.Screen name="Estoque" component={Stock} options={stockStyle} />
      <Drawer.Screen
        name="Clientes"
        component={Clients}
        options={clientsStyle}
      />
      <Drawer.Screen name="Cliente" component={Client} options={clientStyle} />
      <Drawer.Screen name="Usuários" component={Users} options={usersStyle} />
      <Drawer.Screen name="Usuário" component={User} options={userStyle} />
    </Drawer.Navigator>
  );
};

export default AppStack;

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
