import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 200px;
  background-color: ${COLORS.primaryDark};
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
`;

const Texto = styled.Text`
  font-size: 15px;
  color: ${COLORS.white};
  text-align: center;
`;

const Image = styled.Image`
  border-bottom-color: ${COLORS.primary};
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border-color: black;
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <Image  source={{ uri: item.img !== '' ? item.img
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXusGK_JYWv_WvhPl9PAVKb7g71ny6lRMiA&usqp=CAUss',
        }} />     
        <Texto>{item.uid} :{item.nome}, {item.descricao}</Texto>
        <Texto>{item.fornecedor}</Texto>
        <Texto>Venda:{item.valorVenda} - Custo:{item.valorCusto}</Texto>
        <Texto>Qtde: {item.quantidade} - Validade:{item.validade}</Texto>
      </>
    </Button>
  );
};
export default Item;
