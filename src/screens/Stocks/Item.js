import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 120px;
  background-color: ${COLORS.primaryDark};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const Texto = styled.Text`
  font-size: 24px;
  color: ${COLORS.white};
`;

const TextGeral = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${COLORS.white};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextGeral>{item.uid}</TextGeral>
        <Texto>{item.nome}</Texto>
        <TextGeral>{item.quantidade}</TextGeral>
        <TextGeral>{item.validade}</TextGeral>
        <TextGeral>{item.custo}</TextGeral>
        <TextGeral>{item.venda}</TextGeral>
      </>
    </Button>
  );
};
export default Item;
