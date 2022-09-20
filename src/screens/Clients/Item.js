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

const TextNome = styled.Text`
  font-size: 24px;
  color: ${COLORS.white};
`;

const TextTelefone = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${COLORS.white};
`;

const TextGeral = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextNome>{item.nome}</TextNome>
        <TextTelefone>Telefone:{item.telefone}</TextTelefone>
        <TextGeral>Endereço:{item.endereco}</TextGeral>
        {/* <TextGeral>{item.latitude}</TextGeral>
        <TextGeral>{item.longitude}</TextGeral> */}
      </>
    </Button>
  );
};
export default Item;
