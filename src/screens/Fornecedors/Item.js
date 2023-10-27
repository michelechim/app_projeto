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
const TextGeral = styled.Text`
  font-size: 15px;
  color: ${COLORS.black};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextGeral>Marca:{item.marca}</TextGeral>
        <TextGeral>Responsável:{item.responsavel}</TextGeral>
        <TextGeral>Contato:{item.contato}</TextGeral>
      </>
    </Button>
  );
};
export default Item;
