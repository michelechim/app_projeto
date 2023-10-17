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
  width: 40%;
  height: auto;
`;
const Div2 = styled.View`
  width: 60%;
  height: auto;
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
          <Texto>Data de criação: {item.dataCriacao} </Texto>
          <Texto>Data de Venc.: {item.dataVenc}</Texto>
          <Texto>Cliente: {item.nomeCliente}</Texto>
          <Texto>N°Pedido: {item.numeroPedido}</Texto>
        </Div>
        <Div2>
          <Texto>Código do produto: {item.itemUidProduto}</Texto>
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
