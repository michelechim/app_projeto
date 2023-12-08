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

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <Texto>Marca:{item.marca}</Texto>
        <Texto>Responsável:{item.responsavel}</Texto>
        <Texto>Contato:{item.contato}</Texto>
      </>
    </Button>
  );
};
export default Item;
