import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {ClientContext} from '../../context/ClientProvider';

const Client = ({route, navigation}) => {
  const [endereco, setEndereco] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveClient, deleteClient} = useContext(ClientContext);

  useEffect(() => {
    console.log(route.params.client);
    setEndereco('');
    setNome('');
    setTelefone('');
    setUid('');
    if (route.params.client) {
      setEndereco(route.params.client.endereco);
      setNome(route.params.client.nome);
      setTelefone(route.params.client.telefone);
      setUid(route.params.client.uid);
    }
    return () => {
      console.log('desmontou cliente');
    };
  }, [route]);

  const salvar = async () => {
    if (nome && telefone && endereco) {
      let client = {};
      client.endereco = endereco;
      client.nome = nome;
      client.telefone = telefone;
      client.uid = uid;
      setLoading(true);
      await saveClient(client);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção:', 'Digite todos os campos.');
    }
  };

  const exclui = () => {
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
        placeholder="Nome do cliente"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome()}
        value={nome}
      />
      <TextInput
        placeholder="Telefone"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setTelefone()}
        value={telefone}
      />
      <TextInput
        placeholder="Endereço completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEndereco()}
        value={endereco}
      />
      <Button texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={exclui} /> : null}

      {/* <AddFloatButton onClick={routeAddUser} /> */}
      {loading && <Loading />}
    </Container>
  );
};
export default Client;
