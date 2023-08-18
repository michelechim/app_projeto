import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {ProductContext} from '../../context/ProductProvider';

const Product = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [img, setImg] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  //const [sku, setSku] = useState('');
  const [validade, setValidade] = useState('');
  const [valorCusto, setValorCusto] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveProduct, deleteProduct} = useContext(ProductContext);

  useEffect(() => {
    console.log(route.params.product);
    setUid('');
    setDescricao('');
    setFornecedor('');
    setImg('');
    setNome('');
    setQuantidade('');
    //setSku('');
    setValidade('');
    setValorCusto('');
    setValorVenda('');
    if (route.params.product) {
      setUid(route.params.product.uid);
      setDescricao(route.params.product.descricao);
      setFornecedor(route.params.product.fornecedor);
      setImg(route.params.product.img);
      setNome(route.params.product.nome);
      setQuantidade(route.params.product.quantidade);
      //setSku(route.params.product.sku);
      setValidade(route.params.product.validade);
      setValorCusto(route.params.product.valorCusto);
      setValorVenda(route.params.product.valorVenda);
    }
    return () => {
      console.log('desmontou produto');
    };
  }, [route]);

  const salvar = async () => {
    // console.log(nome);
    // console.log(validade);
    if (
      uid &&
      descricao &&
      fornecedor &&
      img &&
      quantidade &&
      nome &&
      validade &&
      valorCusto &&
      valorVenda
    ) {
      let product = {};
      product.uid = uid;
      product.descricao = descricao;
      product.fornecedor = fornecedor;
      product.img = img;
      product.nome = nome;
      product.quantidade = quantidade;
      // product.sku = sku;
      product.validade = validade;
      product.valorCusto = valorCusto;
      product.valorVenda = valorVenda;
      setLoading(true);
      await saveProduct(product);
      //await saveProduct(product);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção:', 'Digite todos os campos.');
    }
  };

  const exclui = () => {
    Alert.alert('Atenção', 'Vocẽ tem certeza que deseja excluir o produto?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteProduct(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Código do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setUid(t)}
        value={uid}
      />
      <TextInput
        placeholder="Descrição do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDescricao(t)}
        value={descricao}
      />
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Fornecedor"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setFornecedor(t)}
        value={fornecedor}
      />
      <TextInput
        placeholder="Imagem"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setImg(t)}
        value={img}
      />
      <TextInput
        placeholder="Quantidade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setQuantidade(t)}
        value={quantidade}
      />
      {/* <TextInput
        placeholder="SKU"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setSku(t)}
        value={sku}
      /> */}
      <TextInput
        placeholder="Validade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setValidade(t)}
        value={validade}
      />
      <TextInput
        placeholder="Valor de custo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setValorCusto(t)}
        value={valorCusto}
      />
      <TextInput
        placeholder="Valor de venda"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setValorVenda(t)}
        value={valorVenda}
      />
      <Button texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={exclui} /> : null}

      {/* <AddFloatButton onClick={routeAddUser} /> */}
      {loading && <Loading />}
    </Container>
  );
};
export default Product;
