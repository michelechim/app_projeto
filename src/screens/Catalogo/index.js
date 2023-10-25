import React, {useEffect, useState} from 'react';
import {Container, Image, Text} from './styles';

import Loading from '../../components/Loading';

const Catalogo = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [img, setImg] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [valorCusto, setValorCusto] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [loading] = useState(false);

  useEffect(() => {
    console.log(route.params.catalogo);
    setUid('');
    setDescricao('');
    setFornecedor('');
    setImg('');
    setNome('');
    setQuantidade('');
    setValidade('');
    setValorCusto('');
    setValorVenda('');
    if (route.params.catalogo) {
      setUid(route.params.catalogo.uid);
      setDescricao(route.params.catalogo.descricao);
      setFornecedor(route.params.catalogo.fornecedor);
      setImg(route.params.catalogo.img);
      setNome(route.params.catalogo.nome);
      setQuantidade(route.params.catalogo.quantidade);
      setValidade(route.params.catalogo.validade);
      setValorCusto(route.params.catalogo.valorCusto);
      setValorVenda(route.params.catalogo.valorVenda);
    }
    return () => {
      console.log('desmontou catalogo');
    };
  }, [route]);

  return (
    <Container>
      <Image  source={{ uri: img !== '' ? img
        : 'https://cdn.pixabay.com/photo/2019/05/25/14/47/eye-4228531_960_720.png',
      }} />
      <Text>FICHA COMPLETA</Text>
      <Text>Código: {uid}</Text>
      <Text>Descrição: {descricao}</Text>
      <Text>Nome: {nome}</Text>
      <Text>Fornecedor: {fornecedor}</Text>
      <Text>Quantidade: 0{quantidade}</Text>
      <Text>Validade: {validade}</Text>
      <Text>Valor de custo: R$ {valorCusto}</Text>
      <Text>Valor de venda: R$ {valorVenda}</Text>
      {loading && <Loading />}
    </Container>
  );
};
export default Catalogo;
