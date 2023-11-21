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
import Products from '../screens/Products';
import Product from '../screens/Product';
import Consultor from '../screens/Consultor';
import Consultors from '../screens/Consultors';
import Catalogo from '../screens/Catalogo';
import Catalogos from '../screens/Catalogos';
import Venda from '../screens/Venda';
import Vendas from '../screens/Vendas';
import Fornecedor from '../screens/Fornecedor';
import Fornecedors from '../screens/Fornecedors';
import {COLORS} from '../assets/colors';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  const AppStack = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Catalogos"
        screenOptions={{
          headerShown: 'true',
          headerStyle: {
            backgroundColor: COLORS.primaryDark,
          },
          headerTintColor: COLORS.white,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Products" component={Products} options={productsStyle} />
        <Drawer.Screen name="Product" component={Product} options={productStyle} />
        <Drawer.Screen name="Clients" component={Clients} options={clientsStyle} />
        <Drawer.Screen name="Client" component={Client} options={clientStyle} />
        <Drawer.Screen name="Consultors" component={Consultors} options={consultorsStyle} />
        <Drawer.Screen name="Consultor" component={Consultor} options={consultorStyle} />
        <Drawer.Screen name="Catalogos" component={Catalogos} options={catalogosStyle} />
        <Drawer.Screen name="Catalogo" component={Catalogo} options={catalogoStyle} />
        <Drawer.Screen name="Vendas" component={Vendas} options={vendasStyle} />
        <Drawer.Screen name="Venda" component={Venda} options={vendaStyle} />
        <Drawer.Screen name="Fornecedors" component={Fornecedors} options={fornecedorsStyle} />
        <Drawer.Screen name="Fornecedor" component={Fornecedor} options={fornecedorStyle} />
      </Drawer.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen name="Preload" component={Preload} options={preloadStyle} />
        <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
        <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
        <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} options={forgotPassWordStyle}/>
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
    headerTintColor: COLORS.primaryDark,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
  title: 'Catálogo de Produtos'
};
const vendaStyle = {
  title: 'Venda'
};
const vendasStyle = {
  title: 'Vendas'
};
const fornecedorStyle = {
  title: 'Fornecedor'
};
const fornecedorsStyle = {
  title: 'Fornecedores'
};