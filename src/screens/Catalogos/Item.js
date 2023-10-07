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
          <Texto>Cód: {item.uid} </Texto>
          <Texto>Descrição: {item.descricao}, {item.nome}</Texto>
          <Texto>Quantidade: 0{item.quantidade}</Texto>
        </Div>
        <DivImage>
          <Image  source={{ uri: item.img !== '' ? item.img
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXusGK_JYWv_WvhPl9PAVKb7g71ny6lRMiA&usqp=CAUss',
          }} /> 
        </DivImage> 
      </DivGeral> 
    </Button>
  );
};
export default Item;
