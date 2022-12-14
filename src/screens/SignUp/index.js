import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {Body, TextInput} from './styles';

import Button from '../../components/Button';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';

const SignUp = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {signUp} = useContext(AuthUserContext);

  const cadastrar = async () => {
    if (nome !== '' && email !== '' && pass !== '' && confirPass !== '') {
      if (pass === confirPass) {
        let user = {};
        user.nome = nome;
        user.email = email;
        setLoading(true);
        await signUp(user, pass);
        setLoading(false);
      } else {
        Alert.alert('Erro', 'As senhas digitadas são diferentes.');
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
      />
      <Button texto="Cadastrar" onClick={cadastrar} />
      {loading && <Loading />}
    </Body>
  );
};
export default SignUp;
