import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: auto;
  background-color: ${COLORS.primaryDark};
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
`;
const Texto = styled.Text`
  font-size: 15px;
  color: ${COLORS.white};
`;
const TextGeral = styled.Text`
  font-size: 15px;
  color: ${COLORS.black};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <Texto>Nome:{item.nome}</Texto>
        <TextGeral>Email:{item.email}</TextGeral>
        <TextGeral>Data de Nasc.:{item.dataNasc} - Telefone: {item.telefone}</TextGeral>
        <Texto>Endereço</Texto>
        <TextGeral>Residencial:{item.endereco}</TextGeral>
        <TextGeral>Entrega: {item.enderecoEntrega}</TextGeral>
        
      </>
    </Button>
  );
};
export default Item;
