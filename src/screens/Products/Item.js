import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: auto;
  background-color: ${COLORS.primaryDark};
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
`;
const DivGeral = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const Div = styled.View`
  width: 75%;
  height: auto;
`;
const DivImage = styled.View`
  width: 25%;
  flex-direction: row;
  align-items: center;
`;
const Image = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 50px;
  background-color: ${COLORS.white};
`;
const Texto = styled.Text`
  font-size : 14px;
  color: ${COLORS.black};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <DivGeral>
        <Div>
          <Texto>Cód: {item.uid}</Texto>
          <Texto>Nome: {item.nome} , {item.fornecedor}</Texto>
          <Texto>Venda:R$ {item.valorVenda} - Custo:R$ {item.valorCusto}</Texto>
          <Texto>Qtde: 0{item.quantidade} - Validade:{item.validade}</Texto>
        </Div>
        <DivImage>
          <Image  source={{ uri: item.img !== '' ? item.img
            : 'https://cdn.pixabay.com/photo/2019/05/25/14/47/eye-4228531_960_720.png',
          }} /> 
        </DivImage> 
      </DivGeral> 
    </Button>
  );
};
export default Item;
