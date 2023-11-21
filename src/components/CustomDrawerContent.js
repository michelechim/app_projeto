import React, {useContext} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommonActions} from '@react-navigation/native';
import DrawerHeader from '../components/DrawerHeader';
import {AuthUserContext} from '../context/AuthUserProvider';

import {COLORS} from '../assets/colors';

const Page = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background-color: ${COLORS.primaryDark};
`;
const Body = styled.View`
  flex: 6;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 18px;
  padding-top: 30px;
  border-color: 'red';
`;
const ScrollView = styled.ScrollView`
  width: 100%;
`;
const DivItem = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
`;
const ItemMenuText = styled.Text`
  font-size: 20px;
  margin: 10px;
  color: ${COLORS.primaryDark};
`;
const CustomDrawerContent = ({navigation}) => {
  const {signOut} = useContext(AuthUserContext);

  return (
    <Page>
      <Header>
        <DrawerHeader />
      </Header>
      <Body>
        <ScrollView>
{/* Clientes */}
          <DivItem>
            <Icon name="people-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Clients');
              }}>
              Clientes
            </ItemMenuText>
          </DivItem>
{/* Consultor */}
          <DivItem>
            <Icon name="person-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Consultors');
              }}>
              Consultor
            </ItemMenuText>
          </DivItem>
{/* Produtos */}        
          <DivItem>
            <Icon name="basket-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Products');
              }}>
              Produtos
            </ItemMenuText>
          </DivItem>
{/* Fornecedor */}        
          <DivItem>
            <Icon name="business-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Fornecedors');
              }}>
              Fornecedores
            </ItemMenuText>
          </DivItem>
{/* Catalogo */}          
          <DivItem>
            <Icon name="book-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Catalogos');
              }}>
              Catálogo de Produtos
            </ItemMenuText>
          </DivItem>
{/* Vendas */}
          <DivItem>
          <Icon name="cart-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Vendas');
              }}>
              Vendas
            </ItemMenuText>
          </DivItem>
{/* Sair */}
          <DivItem>
            <Icon name="exit-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={async () => {
                await signOut();
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'AuthStack'}],
                  }),
                );
              }}>
              Sair
            </ItemMenuText>
          </DivItem>          
        </ScrollView>
      </Body>
    </Page>
  );
};
export default CustomDrawerContent;
