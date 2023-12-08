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
  font-size: 18px;
  color: ${COLORS.white};
`;
// const TextGeral = styled.Text`
//   font-size: 20px;
//   color: ${COLORS.black};
// `;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <Texto>Nome:{item.nome}</Texto>
        <Texto>Email:{item.email}</Texto>
        <Texto>Data de Nasc.:{item.dataNasc}</Texto>
        <Texto>Telefone: {item.telefone}</Texto>
        <Texto>Endereço Residencial:{item.endereco}</Texto>
        <Texto>Endereco de Entrega: {item.enderecoEntrega}</Texto>
        
      </>
    </Button>
  );
};
export default Item;
