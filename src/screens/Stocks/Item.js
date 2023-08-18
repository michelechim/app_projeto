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
        <Texto>
          {item.uid} - {item.nome}
        </Texto>
        <TextGeral>
          Custo:{item.custo} - Venda:{item.venda}
        </TextGeral>
        <TextGeral>Quantidade:{item.quantidade}</TextGeral>
        <TextGeral>Validade:{item.validade}</TextGeral>
      </>
    </Button>
  );
};
export default Item;
