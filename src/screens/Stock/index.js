import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {StockContext} from '../../context/StockProvider';

const Stock = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [custo, setCusto] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [venda, setVenda] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveStock, deleteStock} = useContext(StockContext);

  useEffect(() => {
    console.log(route.params.stock);
    setUid(null);
    setCusto('');
    setNome('');
    setQuantidade('');
    setValidade('');
    setVenda('');
    if (route.params.stock) {
      setUid(route.params.stock.uid);
      setCusto(route.params.stock.custo);
      setNome(route.params.stock.nome);
      setQuantidade(route.params.stock.quantidade);
      setValidade(route.params.stock.validade);
      setVenda(route.params.stock.venda);
    }
    return () => {
      console.log('desmontou estoque');
    };
  }, [route]);

  const salvar = async () => {
    console.log(nome);
    console.log(validade);
    if (uid && custo && nome && quantidade && validade && venda) {
      let stock = {};
      stock.uid = uid;
      stock.custo = custo;
      stock.nome = nome;
      stock.quantidade = quantidade;
      stock.validade = validade;
      stock.venda = venda;
      setLoading(true);
      await saveStock(stock);
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
          await deleteStock(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="código do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setUid(t)}
        value={uid}
      />
      <TextInput
        placeholder="Nome do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Quantidade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setQuantidade(t)}
        value={quantidade}
      />
      <TextInput
        placeholder="Validade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setValidade(t)}
        value={validade}
      />
      <TextInput
        placeholder="R$ custo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCusto(t)}
        value={custo}
      />
      <TextInput
        placeholder="R$ venda"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setVenda(t)}
        value={venda}
      />
      <Button texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={exclui} /> : null}

      {/* <AddFloatButton onClick={routeAddUser} /> */}
      {loading && <Loading />}
    </Container>
  );
};
export default Stock;
