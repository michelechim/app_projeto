import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {UserContext} from '../../context/UserProvider';

const User = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveUser, deleteUser} = useContext(UserContext);

  useEffect(() => {
    console.log(route.params.course);
    setNome('');
    setEmail('');
    setUid(null);
    if (route.params.user) {
      setNome(route.params.user.nome);
      setEmail(route.params.user.email);
      setUid(route.params.user.uid);
    }
    return () => {
      console.log('desmontou User');
    };
  }, [route]);

  const salvar = async () => {
    if (nome && email) {
      let user = {};
      user.uid = uid;
      user.nome = nome;
      user.email = email;
      setLoading(true);
      await saveUser(user);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
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
          await deleteUser(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        editable={false}
        value={email}
      />
      <Button texto="Salvar" onClick={salvar} />
      {/* <DeleteButton texto="Excluir" onClick={'teste'} /> */}
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};

export default User;
