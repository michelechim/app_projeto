import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {VendaContext} from '../../context/VendaProvider';

const Venda = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');
  const [dataVenc, setDataVenc]= useState('');
  const [itemMarca, setItemMarca]= useState('');
  const [itemQuantidade, setItemQuantidade]= useState('');
  const [itemTotal, setItemTotal]= useState('');
  const [itemUidProduto, setItemUidProduto]= useState('');
  const [numeroPedido, setNumeroPedido] = useState('');
  const [parcelas, setParcelas]= useState('');
  const [situacao, setSituacao]= useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveOrder, deleteOrder} = useContext(VendaContext);

  useEffect(() => {
    console.log(route.params.venda);
    setUid('');
    setDataCriacao('');
    setDataVenc('');
    setItemMarca('');
    setItemQuantidade('');
    setItemTotal('');
    setItemUidProduto('');
    setNumeroPedido('');
    setParcelas('');
    setSituacao('');
    setNomeCliente('');
    if (route.params.venda) {
      setUid(route.params.venda.uid);
      setDataCriacao(route.params.venda.dataCriacao);
      setDataVenc(route.params.venda.dataVenc);
      setItemMarca(route.params.venda.itemMarca);
      setItemQuantidade(route.params.venda.itemQuantidade);
      setItemTotal(route.params.venda.itemTotal);
      setItemUidProduto(route.params.venda.itemUidProduto);
      setNumeroPedido(route.params.venda.numeroPedido);
      setParcelas(route.params.venda.parcelas);
      setSituacao(route.params.venda.situacao);
      setNomeCliente(route.params.venda.nomeCliente);    
    }
    return () => {
      console.log('desmontou a venda');
    };
  }, [route]);

  const salvar = async () => {
    if (
      //uid &&
      dataCriacao &&
      dataVenc &&
      itemMarca &&
      itemQuantidade &&
      itemTotal &&
      itemUidProduto &&
      numeroPedido &&
      parcelas &&
      situacao &&
      nomeCliente
    ) {
      let order = {};
      order.uid = uid;
      order.dataCriacao = dataCriacao;
      order.dataVenc = dataVenc;
      order.itemMarca = itemMarca;
      order.itemQuantidade = itemQuantidade;
      order.itemTotal = itemTotal;
      order.itemUidProduto = itemUidProduto;
      order.numeroPedido = numeroPedido;
      order.parcelas = parcelas;
      order.situacao = situacao;
      order.nomeCliente = nomeCliente;
      setLoading(true);
      await saveOrder(order);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção:', 'Digite todos os campos.');
    }
  };

  const excluir = () => {
    Alert.alert('Atenção', 'Vocẽ tem certeza que deseja excluir a venda?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteOrder(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Data de Criação"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDataCriacao(t)}
        value={dataCriacao}
      />
      <TextInput
        placeholder="Data de Vencimento"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDataVenc(t)}
        value={dataVenc}
      />
      <TextInput
        placeholder="Nome do cliente"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNomeCliente(t)}
        value={nomeCliente}
      />
      <TextInput
        placeholder="Número do pedido"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNumeroPedido(t)}
        value={numeroPedido}
      />
      <TextInput
        placeholder="Codigo do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setItemUidProduto(t)}
        value={itemUidProduto}
      />
      <TextInput
        placeholder="Marca"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setItemMarca(t)}
        value= {itemMarca}
      />
      <TextInput
        placeholder="Quantidade do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setItemQuantidade(t)}
        value={itemQuantidade}
      />
      <TextInput
        placeholder="Total da venda"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setItemTotal(t)}
        value={itemTotal}
      />
      <TextInput
        placeholder="Número de parcelas"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setParcelas(t)}
        value={parcelas}
      />
      <TextInput
        placeholder="Situação"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setSituacao(t)}
        value={situacao}
      />
      <Button texto="SALVAR VENDA" onClick={salvar}/>
      {uid ? <DeleteButton texto="EXCLUIR" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Venda;
