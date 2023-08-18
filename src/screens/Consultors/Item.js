import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 200px;
  background-color: ${COLORS.primaryDark};
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
`;

const TextGeral = styled.Text`
  font-size: 10px;
  text-align: justify;
  color: ${COLORS.white};
`;

const Text = styled.Text`
  font-size: 15px;
  //text-align: center;
  color: ${COLORS.black};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <Text>Dados Pessoais</Text>
        <TextGeral>Nome:{item.nome}</TextGeral>
        <TextGeral>Data de Nasc.:{item.dataNasc}</TextGeral>
        <TextGeral>Endereço:{item.endereco}</TextGeral>
        <TextGeral>Telefone:{item.telefone}</TextGeral>
        <TextGeral>Email:{item.email}</TextGeral>
        <Text>Perfil</Text>
        <TextGeral>
          Marca:{item.uid} e Código:{item.codigo}
        </TextGeral>
        <TextGeral>Data de criação:{item.dataCriacao}</TextGeral>
        <TextGeral>
          Nivel:{item.nivel} e Lucratividade:{item.lucratividade}%
        </TextGeral>
        <TextGeral>
          Usuário:{item.usuario} e Senha:{item.senha}
        </TextGeral>
      </>
    </Button>
  );
};
export default Item;
