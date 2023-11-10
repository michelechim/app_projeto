import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {FornecedorContext} from '../../context/FornecedorProvider';

const Fornecedor = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [marca, setMarca]= useState('');
  const [responsavel, setResponsavel] = useState('');
  const [contato, setContato] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveSupplier, deleteSupplier} = useContext(FornecedorContext);

  useEffect(() => {
    console.log(route.params.fornecedor);
    setUid('');
    setMarca('');
    setResponsavel('');
    setContato('');
    if (route.params.fornecedor) {
      setUid(route.params.fornecedor.uid);
      setMarca(route.params.fornecedor.marca);
      setResponsavel(route.params.fornecedor.responsavel);
      setContato(route.params.fornecedor.contato);    
    }
    return () => {
      console.log('desmontou a Fornecedor');
    };
  }, [route]);

  const salvar = async () => {
    if (
      //uid &&
      marca &&
      responsavel &&
      contato
    ) {
      let supplier = {};
      supplier.uid = uid;
      supplier.marca = marca;
      supplier.responsavel = responsavel;
      supplier.contato = contato;
      setLoading(true);
      await saveSupplier(supplier);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção:', 'Digite todos os campos.');
    }
  };

  const excluir = () => {
    Alert.alert('Atenção', 'Vocẽ tem certeza que deseja excluir a Fornecedor?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteSupplier(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Informe o nome da marca"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setMarca(t)}
        value={marca}
      />
      <TextInput
        placeholder="Informe o nome do responsável"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setResponsavel(t)}
        value={responsavel}
      />
      <TextInput
        placeholder="Informe o contato do responsável"
        placeholderTextColor="black"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setContato(t)}
        value={contato}
      />
      <Button texto="SALVAR" onClick={salvar}/>
      {uid ? <DeleteButton texto="EXCLUIR" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Fornecedor;
