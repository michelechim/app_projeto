import React, {useState} from 'react';
import {Alert} from 'react-native';
import Button from '../../components/Button';
import {Body, TextInput} from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirPass] = useState('');

  console.log(firestore);

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirPass !== '') {
      if (pass === confirPass) {
        auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(() => {
            let userf = auth().currentUser;
            userf
              .sendEmailVerification()
              .then(() => {
                Alert.alert(
                  'Informação:',
                  'Foi enviado um email para: ' + email + 'para verificação.',
                );
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}],
                  }),
                );
              })
              .catch(e => {
                console.log('SignUp, cadastrar: ' + e);
              });
          })
          .catch(e => {
            console.log('SignIn: erro em entrar: ' + e);
            switch (e.code) {
              case 'auth/email-already-in-use':
                Alert.alert('Erro', 'Email já está em uso.');
                break;
              case 'auth/operation-not-allowed':
                Alert.alert('Erro', 'Problemas ao cadastrar o usuário.');
                break;
              case 'auth/invalid-email':
                Alert.alert('Erro', 'Email inválido.');
                break;
              case 'auth/weak-password':
                Alert.alert(
                  'Erro',
                  'Senha é fraca, por favor, digite uma senha forte.',
                );
                break;
            }
          });
      } else {
        Alert.alert('Erro', 'As senhas digitadas não conferem.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, digite email e senha.');
    }
  };
  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
        onEndEditing={() => this.emailTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.emailTextInput = ref;
        }}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        onEndEditing={() => this.passTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.passTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
        onEndEditing={() => this.confirPassTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.confirPassTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Confirmar senha"
        keyboardType="default"
        returnKeyType="send"
        onChangeText={t => setConfirPass(t)}
        onEndEditing={() => cadastrar()}
      />
      <Button texto="Cadastrar" onClick={cadastrar} />
    </Body>
  );
};
export default SignUp;
