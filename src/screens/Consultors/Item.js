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
  font-size: 10px;
  //text-align: justify;
  color: ${COLORS.black};
`;
const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <Texto>Dados Pessoais</Texto>
        {/* <TextGeral>Id: {item.uid}</TextGeral> */}
        <TextGeral>Nome:{item.nome}</TextGeral>
        <TextGeral>Email:{item.email}</TextGeral>
        <TextGeral>Endereço:{item.endereco}</TextGeral>
        <TextGeral>Telefone:{item.telefone}</TextGeral>
        {/* <TextGeral>Data de Nascimento: {item.dataNasc}</TextGeral> */}
        <Texto>Marca: {item.marca}</Texto>
        <TextGeral>Código de consultor:{item.perfilCodigo}</TextGeral>
        <TextGeral>Senha de acesso: {item.perfilSenha} - Usuário de acesso:{item.perfilUsuario}</TextGeral>
        <TextGeral>Nivel: {item.perfilNivel} - Lucratividade: {item.perfilLucratividade}</TextGeral>
      </>
    </Button>
  );
};
export default Item;
