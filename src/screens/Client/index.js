import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {ClientContext} from '../../context/ClientProvider';

const Client = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [enderecoEntrega, setEnderecoEntrega] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveClient, deleteClient} = useContext(ClientContext);

  useEffect(() => {
    console.log(route.params.users);
    setUid('');
    setNome('');
    setEmail('');
    setEndereco('');
    setTelefone('');
    setDataNasc('');
    setEnderecoEntrega('');
    if (route.params.users) {
      setUid(route.params.users.uid);
      setNome(route.params.users.nome);
      setEmail(route.params.users.email);
      setEndereco(route.params.users.endereco);
      setTelefone(route.params.users.telefone);
      setDataNasc(route.params.users.dataNasc);
      setEnderecoEntrega(route.params.users.enderecoEntrega);
    }
    return () => {
      console.log('desmontou cliente');
    };
  }, [route]);

  const salvar = async () => {
    // console.log(nome);
    if (//uid &&
      nome &&
      email &&
      endereco &&
      telefone &&
      dataNasc &&
      enderecoEntrega
    ) {
      let users = {};
      users.uid = uid;
      users.nome = nome;
      users.email = email;
      users.endereco = endereco;
      users.telefone = telefone;
      users.dataNasc = dataNasc;
      users.enderecoEntrega = enderecoEntrega;
      setLoading(true);
      await saveClient(users);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção:', 'Digite todos os campos.');
    }
  };

  const excluir = () => {
    Alert.alert('Atenção', 'Vocẽ tem certeza que deseja excluir o cliente?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteClient(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Informe o nome completo"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Informe o email"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        value={email}
      />
      <TextInput 
        placeholder="Informe o endereço"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEndereco(t)}
        value={endereco}
      />
      <TextInput
        placeholder="Informe o Telefone"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setTelefone(t)}
        value={telefone}
      />
      <TextInput 
        placeholder="Informe a data de nascimento"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDataNasc(t)}
        value={dataNasc}
      />
      <TextInput 
        placeholder="Informe o endereço de entrega"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEnderecoEntrega(t)}
        value={enderecoEntrega}
      />
      <Button texto="Salvar" onClick={salvar}/>
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Client;
