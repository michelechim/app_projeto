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
const DivGeral = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const Div = styled.View`
  width: 70%;
  height: auto;
`;
const DivImage = styled.View`
  width: 30%;
  flex-direction: row;
  align-items: center;
`;
const Image = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  background-color: ${COLORS.white};
`;
const Texto = styled.Text`
  font-size: 18px;
  color: ${COLORS.white};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <DivGeral>
        <Div>
          <Texto>Cód: {item.uid} </Texto>
          <Texto>Nome: {item.nome}</Texto>
          <Texto>Quantidade: {item.quantidade}</Texto>
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
