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
const Texto = styled.Text`
  font-size : 18px;
  color: ${COLORS.white};
`;
const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <Texto>Data de criação: {item.dataCriacao} </Texto>
        <Texto>Data de Venc.: {item.dataVenc}</Texto>
        <Texto>Cliente: {item.nomeCliente}</Texto>
        <Texto>N°Pedido: {item.numeroPedido}</Texto>
        <Texto>Nome do produto: {item.itemNomeProduto}</Texto>
        <Texto>Marca: {item.itemMarca}</Texto>
        <Texto>Quantidade: {item.itemQuantidade}</Texto>
        <Texto>Total: {item.itemTotal}</Texto>          
        <Texto>Parcelas: {item.parcelas}</Texto>
        <Texto>Situação: {item.situacao}</Texto>
    </>
  </Button>
  );
};
export default Item;
