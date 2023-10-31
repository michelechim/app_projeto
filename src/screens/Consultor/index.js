import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput, Text} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import CustomModalNivel from '../../components/CustomModalNivel';
import RadioButton from '../../components/RadioButton';
import Loading from '../../components/Loading';
import {ConsultorContext} from '../../context/ConsultorProvider';

const Consultor = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [marca, setMarca] = useState('');
  const [perfilCodigo, setPerfilCodigo] = useState('');
  const [perfilSenha, setPerfilSenha] = useState('');
  const [perfilUsuario, setPerfilUsuario] = useState('');
  const [perfilNivel, setPerfilNivel] = useState([]);
  const [modalNivelVisible, setModalNivelVisible] = useState(false);
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
    setMarca('');
    setPerfilCodigo('');
    setPerfilSenha('');
    setPerfilUsuario('');
    setPerfilNivel('Selecione o nível');
    setPerfilLucratividade('');
    if (route.params.users) {
      setUid(route.params.users.uid);
      setNome(route.params.users.nome);
      setEmail(route.params.users.email);
      setEndereco(route.params.users.endereco);
      setTelefone(route.params.users.telefone);
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

  const modalNivel = [
    'Semente',
    'Bronze',
    'Prata',
    'Ouro',
    'Diamante',
    'Blue',
    'Rose',
    'Gold',
    'Esmeralda',
  ];

  const selecionarNivel = (val) => {
    setPerfilNivel(val);
    setModalNivelVisible(!modalNivelVisible);
  };

  return (
    <Container>
      <TextInput
        placeholder="Informe seu nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Informe seu email"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        value={email}
      />
      <TextInput 
        placeholder="Informe seu endereço"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEndereco(t)}
        value={endereco}
      />
      <TextInput
        placeholder="Informe seu telefone de contato"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setTelefone(t)}
        value={telefone}
      />
      <TextInput 
        placeholder="Informe a marca"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setMarca(t)}
        value={marca}
      />
      {/* MODAL */}
      <Text
        onPress={() => setModalNivelVisible(!modalNivelVisible)}
        placeholder="Selecione seu nível">
          {perfilNivel}
      </Text>
      <TextInput
        placeholder="Informe seu código do consultor"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilCodigo(t)}
        value={perfilCodigo}
      />
      <TextInput 
        placeholder="Salve sua senha de acesso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilSenha(t)}
        value={perfilSenha}
      />
      <TextInput 
        placeholder="Salve seu usuário de acesso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilUsuario(t)}
        value={perfilUsuario}
      />
      
      <TextInput
        placeholder="Informe sua lucratividade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t=> setPerfilLucratividade(t)}
        value={perfilLucratividade}
      />
      <Button texto="SALVAR" onClick={salvar}/>
      {uid ? <DeleteButton texto="EXCLUIR" onClick={excluir} /> : null}

      <CustomModalNivel
        visible={modalNivelVisible}
        closeAction={() => setModalNivelVisible(!modalNivelVisible)}>
          {modalNivel.map((o) => (
              <RadioButton
                label={o}
                selected={o === perfilNivel ? true : false}
                onClick={selecionarNivel}
              />
          ))}
      </CustomModalNivel>

      {loading && <Loading />}
    </Container>
  );
};
export default Consultor;
