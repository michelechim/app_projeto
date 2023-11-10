import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput, Text} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import CustomModalCliente from '../../components/CustomModalCliente';
import CustomModalProduto from '../../components/CustomModalProduto';
import CustomModalSituacao from '../../components/CustomModalSituacao';
import CustomModalPagamento from '../../components/CustomModalPagamento';
import CustomModalFornecedor from '../../components/CustomModalFornecedor';
import RadioButton from '../../components/RadioButton';
import Loading from '../../components/Loading';
import {VendaContext} from '../../context/VendaProvider';
import {ClientContext} from '../../context/ClientProvider';
import {ProductContext} from '../../context/ProductProvider';
import {FornecedorContext} from '../../context/FornecedorProvider';

const Venda = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');
  const [dataVenc, setDataVenc]= useState('');
  const [itemMarca, setItemMarca]= useState([]);
  const [modalItemMarcaVisible, setModalItemMarcaVisible] = useState(false);
  const [itemQuantidade, setItemQuantidade]= useState('');
  const [itemTotal, setItemTotal]= useState('');
  const [numeroPedido, setNumeroPedido] = useState('');
  const [parcelas, setParcelas]= useState('');
  const [pagamento, setPagamento] = useState([]);
  const [itemNomeProduto, setItemNomeProduto]= useState([]);
  const [situacao, setSituacao]= useState([]);
  const [nomeCliente, setNomeCliente] = useState([]);

  const [modalPagamentoVisible, setModalPagamentoVisible] = useState(false);
  const [modalSituacaoVisible, setModalSituacaoVisible] = useState(false);
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [modalClientVisible, setModalClientVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {saveOrder, deleteOrder} = useContext(VendaContext);
  const {users} = useContext(ClientContext);
  const {product} = useContext(ProductContext);
  const {supplier} = useContext(FornecedorContext);

  useEffect(() => {
    console.log(route.params.venda);
    setUid('');
    setDataCriacao('');
    setDataVenc('');
    setItemMarca('Selecione a marca');
    setItemQuantidade('');
    setItemTotal('');
    setItemNomeProduto('Selecione o produto');
    setNumeroPedido('');
    setParcelas('');
    setSituacao('Selecione a situação do pedido');
    setNomeCliente('Selecione o cliente');
    setPagamento('Selecione a forma de pagamento');
    if (route.params.venda) {
      setUid(route.params.venda.uid);
      setDataCriacao(route.params.venda.dataCriacao);
      setDataVenc(route.params.venda.dataVenc);
      setItemMarca(route.params.venda.itemMarca);
      setItemQuantidade(route.params.venda.itemQuantidade);
      setItemTotal(route.params.venda.itemTotal);
      setItemNomeProduto(route.params.venda.itemNomeProduto);
      setNumeroPedido(route.params.venda.numeroPedido);
      setParcelas(route.params.venda.parcelas);
      setSituacao(route.params.venda.situacao);
      setNomeCliente(route.params.venda.nomeCliente);
      setPagamento(route.params.venda.pagamento);  
    }
    return () => {
      console.log('desmontou a venda');
    };
  }, [route])

  const salvar = async () => {
    if (
      //uid &&
      dataCriacao &&
      dataVenc &&
      itemMarca &&
      itemQuantidade &&
      itemTotal &&
      itemNomeProduto &&
      numeroPedido &&
      parcelas &&
      situacao &&
      nomeCliente &&
      pagamento
    ) {
      let order = {};
      order.uid = uid;
      order.dataCriacao = dataCriacao;
      order.dataVenc = dataVenc;
      order.itemMarca = itemMarca;
      order.itemQuantidade = itemQuantidade;
      order.itemTotal = itemTotal;
      order.itemNomeProduto = itemNomeProduto;
      order.numeroPedido = numeroPedido;
      order.parcelas = parcelas;
      order.situacao = situacao;
      order.nomeCliente = nomeCliente;
      order.pagamento = pagamento;
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
  const selecionarCliente = (val) => {
    setNomeCliente(val);
    setModalClientVisible(!modalClientVisible);
  };
  const selecionarProduto = (val) => {
    setItemNomeProduto(val);
    setModalProductVisible(!modalProductVisible);
  };
  const modalSituacao = [
    'Aberto',
    'Em faturamento',
    'Em transporte',
    'Entregue',
    'Pago',
  ];
  const selecionarSituacao = (val) => {
    setSituacao(val);
    setModalSituacaoVisible(!modalSituacaoVisible);
  };
  const modalPagamento = [
    'À vista',
    'Parcelado',
  ];
  const selecionarPagamento = (val) => {
    setPagamento(val);
    setModalPagamentoVisible(!modalPagamentoVisible);
  };
  const selecionarMarca = (val) =>{
    setItemMarca(val);
    setModalItemMarcaVisible(!setModalItemMarcaVisible);
  };

  return (
    <Container>
      <TextInput
        placeholder="Informe a data de criação da venda"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDataCriacao(t)}
        value={dataCriacao}
      />     
      <TextInput
        placeholder="Informe a data de pagamento"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDataVenc(t)}
        value={dataVenc}
      />
      <Text
        placeholder="Selecione o nome do cliente"
        onPress={()=> setModalClientVisible(!modalClientVisible)}>
          {nomeCliente}
      </Text>
      <TextInput
        placeholder="Informe o número do pedido"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNumeroPedido(t)}
        value={numeroPedido}
      />
      <Text
        placeholder="Selecione o produto"
        onPress={()=> setModalProductVisible(!modalProductVisible)}>
          {itemNomeProduto}
      </Text>
      <Text
        placeholder = "Selecione a marca"
        onPress={()=> setModalItemMarcaVisible(!modalItemMarcaVisible)}>
          {itemMarca}
      </Text>
      
      <TextInput
        placeholder="Informe a quantidade do produto"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setItemQuantidade(t)}
        value={itemQuantidade}
      />
      <TextInput
        placeholder="Informe o valor total da venda"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setItemTotal(t)}
        value={itemTotal}
      />
      <TextInput
        placeholder="Informe o número de parcelas"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setParcelas(t)}
        value={parcelas}
      />
       <Text
        placeholder="Selecioe a situação do peidido"
        onPress={() => setModalSituacaoVisible(!modalSituacaoVisible)}>
          {situacao}
      </Text>
      <Text
        placeholder="Selecione a forma de pagamento"
        onPress={() => setModalPagamentoVisible(!modalPagamentoVisible)}>
          {pagamento}
      </Text>

      <Button texto="SALVAR" onClick={salvar}/>
      {uid ? <DeleteButton texto="EXCLUIR" onClick={excluir} /> : null}
      
      <CustomModalCliente
        visible={modalClientVisible}
        closeAction={() => setModalClientVisible(!modalClientVisible)}>
          {users.map((o) => {
            return (
              <RadioButton 
                label={o.nome}
                selected={o.nome === nomeCliente ? true : false }
                onClick={selecionarCliente}
              />
            );
          })}
      </CustomModalCliente>

      <CustomModalProduto
        visible={modalProductVisible}
        closeAction={() => setModalProductVisible(!modalProductVisible)}>
          {product.map((o) => {
            return (
              <RadioButton 
                label={o.nome}
                selected={o.nome === itemNomeProduto ? true : false }
                onClick={selecionarProduto}
              />
            );
          })}
      </CustomModalProduto>
      
      <CustomModalSituacao
        visible={modalSituacaoVisible}
        closeAction={() => setModalSituacaoVisible(!modalSituacaoVisible)}>
          {modalSituacao.map((o) => {
            return (
              <RadioButton 
                label={o}
                selected={o=== situacao ? true : false }
                onClick={selecionarSituacao}
              />
            );
          })}
      </CustomModalSituacao>

      <CustomModalPagamento
        visible={modalPagamentoVisible}
        closeAction={() => setModalPagamentoVisible(!modalPagamentoVisible)}>
          {modalPagamento.map((o) => {
            return (
              <RadioButton 
                label={o}
                selected={o=== pagamento ? true : false }
                onClick={selecionarPagamento}
              />
            );
          })}
      </CustomModalPagamento>

      <CustomModalFornecedor
        visible={modalItemMarcaVisible}
        closeAction={() => setModalItemMarcaVisible(!modalItemMarcaVisible)}>
          {supplier.map((o) => {
            return (
              <RadioButton 
                label={o.marca}
                selected={o.marca === itemMarca ? true : false }
                onClick={selecionarMarca}
              />
            );
          })}
      </CustomModalFornecedor>
    {loading && <Loading />}
    </Container>
  );
};
export default Venda;
