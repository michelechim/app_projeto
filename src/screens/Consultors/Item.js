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
// const TextGeral = styled.Text`
//   font-size: 18px;
//   color: ${COLORS.black};
// `;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <Texto>Nome:{item.nome}</Texto>
        <Texto>Email:{item.email}</Texto>
        <Texto>Endereço:{item.endereco}</Texto>
        <Texto>Telefone:{item.telefone}</Texto>
        <Texto>Marca: {item.marca}</Texto>
        <Texto>Código de consultor:{item.perfilCodigo}</Texto>
        <Texto>Usuário de acesso:{item.perfilUsuario}</Texto>
        <Texto>Senha de acesso: {item.perfilSenha}</Texto>
        <Texto>Nivel: {item.perfilNivel} - Lucratividade: {item.perfilLucratividade}</Texto>
      </>
    </Button>
  );
};
export default Item;
