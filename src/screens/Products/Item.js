import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 150px;
  background-color: ${COLORS.primaryDark};
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
`;

const Texto = styled.Text`
  font-size: 15px;
  color: ${COLORS.white};
`;

const TextGeral = styled.Text`
  font-size: 15px;
  //text-align: justify;
  color: ${COLORS.white};
`;
const Text = styled.Text`
  font-size: 15px;
  //text-align: center;
  color: ${COLORS.white};
`;
const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
       <TextGeral>{item.img}</TextGeral>
        <Text>
          {item.uid} :
          <Texto>
            {item.nome} , {item.descricao} - {item.fornecedor}
          </Texto>
        </Text>
        <TextGeral>Venda:{item.valorVenda}</TextGeral>
        <TextGeral>Custo:{item.valorCusto}</TextGeral>
        <TextGeral>Qtde: {item.quantidade}</TextGeral>
        <TextGeral>Validade:{item.validade}</TextGeral>
      </>
    </Button>
  );
};
export default Item;
