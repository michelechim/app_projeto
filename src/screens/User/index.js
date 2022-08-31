/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Button from '../../components/Button';
import {Container, TextInput} from './styles';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';

const User = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  //console.log(route.params.user);

  useEffect(() => {
    setNome(route.params.user.nome);
    setEmail(route.params.user.email);
    setId(route.params.user.id);
  }, []);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const salvar = () => {
    firestore()
      .collection('users')
      .doc(id)
      .set(
        {
          nome: nome,
        },
        {merge: true},
      )
      .then(() => {
        setNome('');
        setEmail('');
        setId('');
        showToast('Dados salvos.');
        navigation.goBack();
      })
      .catch(e => {
        console.log('User, salvar: ' + e);
      });
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
    </Container>
  );
};

export default User;
