import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {AuthUserContext} from '../context/AuthUserProvider';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';

const Container = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  margin: 15px;
`;
const DivIcon = styled.View`
  width: 20%;
  height: auto;
`;
const DivText = styled.View`
  width: 80%;
  height: auto;
`;
const TextWelcome = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: ${COLORS.white};
`;
const TextUserName = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${COLORS.white};
`;

const DrawerHeader = () => {
  const {user} = useContext(AuthUserContext);

  return (
    <Container>
      <DivIcon>
        <Icon name="person-outline" size={35} color={COLORS.white} />
      </DivIcon>
      <DivText>
        <TextWelcome>Bem vindo, consultor(a)</TextWelcome>
        <TextUserName>{user ? user.nome : ''}</TextUserName>
      </DivText>
    </Container>
  );
};
export default DrawerHeader;
