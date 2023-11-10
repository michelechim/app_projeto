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
  width: 30%;
  height: auto;
`;
const Div2 = styled.View`
  width: 70%;
  height: auto;
`;
const Texto = styled.Text`
  font-size : 18px;
  color: ${COLORS.black};
`;
const Text = styled.Text`
  font-size : 16px;
  color: ${COLORS.black};
`;
const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <DivGeral>
        <Div>
          <Text>Data de criação: {item.dataCriacao} </Text>
          <Text>Data de Venc.: {item.dataVenc}</Text>
          <Text>Cliente: {item.nomeCliente}</Text>
          <Text>N°Pedido: {item.numeroPedido}</Text>
        </Div>
        <Div2>
          <Texto>Nome do produto: {item.itemNomeProduto}</Texto>
          <Texto>Marca: {item.itemMarca}</Texto>
          <Texto>Quantidade: {item.itemQuantidade}</Texto>
          <Texto>Total: {item.itemTotal}</Texto>          
          <Texto>Parcelas: {item.parcelas}</Texto>
          <Texto>Situação: {item.situacao}</Texto>
        </Div2>
      </DivGeral> 
    </Button>
  );
};
export default Item;
