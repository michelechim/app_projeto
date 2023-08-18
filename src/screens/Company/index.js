import React, {useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {CompanyContext} from '../../context/CompanyProvider';

const Company = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [lucratividade, setLucratividade] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveCompany, updateCompany, deleteCompany} =
    useContext(CompanyContext);

  useEffect(() => {
    //console.log(route.params.company);
    setNome('');
    setLucratividade('');
    setUid('');
    if (route.params.company) {
      setNome(route.params.company.nome);
      setLucratividade(route.params.company.lucratividade);
      setUid(route.params.company.uid);
    }
    return () => {
      console.log('desmontou Company');
    };
  }, [route]);

  const salvar = async () => {
    if (nome && lucratividade) {
      let company = {};
      company.uid = uid;
      company.nome = nome;
      company.lucratividade = lucratividade;
      setLoading(true);
      if (uid) {
        await updateCompany(company);
      } else {
        await saveCompany(company);
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o curso?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteCompany(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome da Empresa"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Lucratividade em %"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setLucratividade(t)}
        value={lucratividade}
      />
      <Button texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Company;
