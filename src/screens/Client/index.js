import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {ClientContext} from '../../context/ClientProvider';

const Client = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [endereco, setEndereco] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveClient, deleteClient} = useContext(ClientContext);

  useEffect(() => {
    console.log(route.params.client);
    setEndereco('');
    setNome('');
    setTelefone('');
    setLatitude('');
    setLongitude('');
    setUid(null);
    if (route.params.client) {
      setEndereco(route.params.client.endereco);
      setNome(route.params.client.nome);
      setTelefone(route.params.client.telefone);
      setLatitude(route.params.client.latitude);
      setLongitude(route.params.client.longitude);
      setUid(route.params.client.uid);
    }
    return () => {
      console.log('desmontou cliente');
    };
  }, [route]);

  const salvar = async () => {
    console.log(nome);
    console.log(telefone);
    console.log(endereco);
    if (nome && telefone && endereco && latitude && longitude) {
      let client = {};
      client.endereco = endereco;
      client.nome = nome;
      client.telefone = telefone;
      client.latitude = latitude;
      client.longitude = longitude;
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
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Telefone"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setTelefone(t)}
        value={telefone}
      />
      <TextInput
        placeholder="Endereço completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEndereco(t)}
        value={endereco}
      />
      <TextInput
        placeholder="Latitude"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setLatitude(t)}
        value={latitude}
      />
      <TextInput
        placeholder="Longitude"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setLongitude(t)}
        value={longitude}
      />
      <Button texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={exclui} /> : null}

      {/* <AddFloatButton onClick={routeAddUser} /> */}
      {loading && <Loading />}
    </Container>
  );
};
export default Client;
