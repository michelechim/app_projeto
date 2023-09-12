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
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  //const [dataNasc, setDataNasc] = useState('');
  const [marca, setMarca] = useState('');
  const [perfilCodigo, setPerfilCodigo] = useState('');
  const [perfilSenha, setPerfilSenha] = useState('');
  const [perfilUsuario, setPerfilUsuario] = useState('');
  const [perfilNivel, setPerfilNivel] = useState('');
  const [perfilLucratividade, setPerfilLucratividade] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveUser, deleteUser} = useContext(ConsultorContext);

  useEffect(() => {
    console.log(route.params.users);
    setUid('');
    setNome('');
    setEmail('');
    setEndereco('');
    setTelefone('');
    //setDataNasc('');
    setMarca('');
    setPerfilCodigo('');
    setPerfilSenha('');
    setPerfilUsuario('');
    setPerfilNivel('');
    setPerfilLucratividade('');
    if (route.params.users) {
      setUid(route.params.users.uid);
      setNome(route.params.users.nome);
      setEmail(route.params.users.email);
      setEndereco(route.params.users.endereco);
      setTelefone(route.params.users.telefone);
      //setDataNasc(route.params.users.dataNasc);
      setMarca(route.params.users.marca);
      setPerfilCodigo(route.params.users.perfilCodigo);
      setPerfilSenha(route.params.users.perfilSenha);
      setPerfilUsuario(route.params.users.perfilUsuario);
      setPerfilNivel(route.params.users.perfilNivel);
      setPerfilLucratividade(route.params.users.perfilLucratividade);
    }
    return () => {
      console.log('desmontou consultor');
    };
  }, [route]);

  const salvar = async () => {
    // console.log(nome);
    if (//uid &&
      nome &&
      email &&
      endereco &&
      telefone &&
      //dataNasc &&
      marca &&
      perfilCodigo &&
      perfilSenha &&
      perfilUsuario &&
      perfilNivel &&
      perfilLucratividade
    ) {
      let users = {};
      users.uid = uid;
      users.nome = nome;
      users.email = email;
      users.endereco = endereco;
      users.telefone = telefone;
      //users.dataNasc = dataNasc;
      users.marca = marca;
      users.perfilCodigo = perfilCodigo;
      users.perfilSenha = perfilSenha;
      users.perfilUsuario = perfilUsuario;
      users.perfilNivel = perfilNivel;
      users.perfilLucratividade = perfilLucratividade;
      setLoading(true);
      await saveUser(users);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção:', 'Digite todos os campos.');
    }
  };

  const excluir = () => {
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
      {/* <TextInput
        placeholder="Identificação"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setUid(t)}
        value={uid}
      /> */}
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Email"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        value={email}
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
      {/* <TextInput 
        placeholder="Data de Nascimento"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDataNasc(t)}
        value={dataNasc}
      /> */}
      <TextInput 
        placeholder="Marca"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setMarca(t)}
        value={marca}
      />
      <TextInput
        placeholder="Código do consultor"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilCodigo(t)}
        value={perfilCodigo}
      />
      <TextInput 
        placeholder="Senha de acesso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilSenha(t)}
        value={perfilSenha}
      />
      <TextInput 
        placeholder="Usuário de acesso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilUsuario(t)}
        value={perfilUsuario}
      />
      <TextInput 
        placeholder="Nivel"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilNivel(t)}
        value={perfilNivel}
      />
      <TextInput
        placeholder="Lucratividade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilLucratividade(t)}
        value={perfilLucratividade}
      />

      <Button texto="Salvar" onClick={salvar}/>
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Consultor;
