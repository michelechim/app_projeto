import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {ConsultorContext} from '../../context/ConsultorProvider';

const Consultor = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [codigo, setCodigo] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');
  const [lucratividade, setLucratividade] = useState('');
  const [nivel, setNivel] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveUser, deleteUser} = useContext(ConsultorContext);

  useEffect(() => {
    //console.log(route.params.users);
    setUid('');
    setNome('');
    setDataNasc('');
    setEndereco('');
    setTelefone('');
    setEmail('');
    setId('');
    setCodigo('');
    setDataCriacao('');
    setLucratividade('');
    setNivel('');
    setSenha('');
    setUsuario('');
    if (route.params.users) {
      setUid(route.params.users.uid);
      setNome(route.params.users.nome);
      setDataNasc(route.params.users.dataNasc);
      setEndereco(route.params.users.endereco);
      setTelefone(route.params.users.telefone);
      setEmail(route.params.users.email);
    } else if (route.params.profile) {
      setId(route.params.profile.id);
      setCodigo(route.params.profile.codigo);
      setDataCriacao(route.params.profile.dataCriacao);
      setLucratividade(route.params.profile.lucratividade);
      setNivel(route.params.profile.nivel);
      setSenha(route.params.profile.senha);
      setUsuario(route.params.profile.usuario);
    }
    return () => {
      console.log('desmontou consultor');
    };
  }, [route]);

  const salvar = async () => {
    if (
      nome &&
      dataNasc &&
      endereco &&
      telefone &&
      email &&
      id &&
      nivel &&
      codigo &&
      dataCriacao &&
      lucratividade &&
      senha &&
      usuario
    ) {
      let users = {};
      users.nome = nome;
      users.dataNasc = dataNasc;
      users.endereco = endereco;
      users.email = email;
      users.uid = id;
      users.codigo = codigo;
      users.dataCriacao = dataCriacao;
      users.lucratividade = lucratividade;
      users.nivel = nivel;
      users.senha = senha;
      users.usuario = usuario;
      setLoading(true);
      await saveUser(users);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção:', 'Digite todos os campos.');
    }
  };

  const exclui = () => {
    Alert.alert('Atenção', 'Vocẽ tem certeza que deseja excluir o consultor?', [
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
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Data de Nascimento"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDataNasc(t)}
        value={dataNasc}
      />
      <TextInput
        placeholder="Endereço"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEndereco(t)}
        value={endereco}
      />
      <TextInput
        placeholder="Telefone"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setTelefone(t)}
        value={telefone}
      />
      <TextInput
        placeholder="Email"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        value={email}
      />
      <TextInput
        placeholder="Marca"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setId(t)}
        value={id}
      />
      <TextInput
        placeholder="Código"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCodigo(t)}
        value={codigo}
      />
      <TextInput
        placeholder="Data de Criação"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDataCriacao(t)}
        value={dataCriacao}
      />
      <TextInput
        placeholder="Nivel"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNivel(t)}
        value={nivel}
      />
      <TextInput
        placeholder="Lucratividade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setLucratividade(t)}
        value={lucratividade}
      />
      <TextInput
        placeholder="Usuário"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setUsuario(t)}
        value={usuario}
      />
      <TextInput
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setSenha(t)}
        value={senha}
      />

      <Button texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={exclui} /> : null}

      {/* <AddFloatButton onClick={routeAddUser} /> */}
      {loading && <Loading />}
    </Container>
  );
};
export default Consultor;
