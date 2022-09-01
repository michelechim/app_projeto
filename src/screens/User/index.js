/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Button from '../../components/Button';
import {Container, TextInput} from './styles';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';
import DeleteButton from '../../components/DeleteButton';
import {Alert} from 'react-native';
import Loading from '../../components/Loading';

const User = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

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

  const excluir = () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o curso?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          setLoading(true);
          excluir(id);
          setLoading(false);
          navigation.goBack();
          firestore()
            .collection('users')
            .doc(id)
            .delete()
            .then(() => {
              showToast('Usuário excluído.');
            })
            .catch(e => {
              console.error('User, excluir: ', e);
            });
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
      {id ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};

export default User;
