import React, {useContext, useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';
import {Container, TextInput, Image} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {ProductContext} from '../../context/ProductProvider';

const Product = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [img, setImg] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [valorCusto, setValorCusto] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveProduct, deleteProduct, product} = useContext(ProductContext);
  const [setVisible] = useState(false);

  useEffect(() => {
    console.log(route.params.product);
    setUid('');
    setDescricao('');
    setFornecedor('');
    setImg('');
    setNome('');
    setQuantidade('');
    setValidade('');
    setValorCusto('');
    setValorVenda('');
    if (route.params.product) {
      setUid(route.params.product.uid);
      setDescricao(route.params.product.descricao);
      setFornecedor(route.params.product.fornecedor);
      setImg(route.params.product.img);
      setNome(route.params.product.nome);
      setQuantidade(route.params.product.quantidade);
      setValidade(route.params.product.validade);
      setValorCusto(route.params.product.valorCusto);
      setValorVenda(route.params.product.valorVenda);
    }
    return () => {
      console.log('desmontou produto');
    };
  }, [route]);

  const salvar = async () => {
    // console.log(nome);
    if (
      uid &&
      descricao &&
      fornecedor &&
      img &&
      quantidade &&
      nome &&
      validade &&
      valorCusto &&
      valorVenda
    ) {
      let product = {};
      product.uid = uid;
      product.descricao = descricao;
      product.fornecedor = fornecedor;
      product.img = img;
      product.nome = nome;
      product.quantidade = quantidade;
      product.validade = validade;
      product.valorCusto = valorCusto;
      product.valorVenda = valorVenda;
      setLoading(true);
      await saveProduct(product);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção:', 'Digite todos os campos.');
    }
  };

  const exclui = () => {
    Alert.alert('Atenção', 'Vocẽ tem certeza que deseja excluir o produto?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteProduct(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  const selectImage = () => {
    const options = {
      storageOptions: {
        title: 'Tirar uma foto',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log('Image picker Error:', response.errorMessage);
      } else if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        const path = response.assets[0].uri;
        setImg(path);
      }
    });
  };

  const takePicker = () => {
    const options = {
      storageOptions: {
        title: 'Selecionar  uma imagem',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
    };
    launchCamera(options, response => {
      if (response.errorCode) {
        console.log('errorMessage-> ', response.errorMessage);
      } else if (response.didCancel) {
        console.log('User Cancel Photograph:');
      } else {
        const path = response?.assets[0]?.uri;
        setImg(path);
      }
    });
  };
  const sendDados = async (urlImageParcial, urlCompleta) => {
    await saveProduct(product, urlImageParcial, urlCompleta, () => {
      setVisible(false);
    });
  };
  async function sendImageDatabase(data) {
    let imageRefact = await ImageResizer.createResizedImage(
      img, 200, 350, 'PNG', 100,
    );
    const urlImageParcial = `images/${product.uid}/${product.nome}.jpeg`;
    const task = storage().ref(urlImageParcial).putFile(imageRefact?.uri);
    task.on('state_changed', taskSnapshot => {
      console.log('Transf:\n' +
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
    });
    
    task
    .then(async () => {
      const urlCompleta = await storage()
      .ref(urlImageParcial)
      .getDownloadURL();
      sendDados(urlImageParcial, urlCompleta);
    })
    .catch(e => {
      console.log(' Catch  Task =>');
      Alert.alert('Erro !', 'Impossivel salvar seu produto, tente mais tarde!!');
      console.error(e);
    });
  }
  

  return (
    <Container>
      <Image  source={{ uri: img !== '' ? img
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXusGK_JYWv_WvhPl9PAVKb7g71ny6lRMiA&usqp=CAUss',
      }} />
      <Button texto="Selecionar Imagem" onClick={selectImage}/>
      <Button texto="Tirar foto" onClick={takePicker}/>
      {/* <Button texto="Salvar Imagem" onClick={sendImageDatabase}/> */}

      <TextInput
        placeholder="Código do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setUid(t)}
        value={uid}
      />
      <TextInput
        placeholder="Descrição do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDescricao(t)}
        value={descricao}
      />
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Fornecedor"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setFornecedor(t)}
        value={fornecedor}
      />
      {/* <TextInput
        placeholder="Imagem"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setImg(t)}
        value={img}
      /> */}
      <TextInput
        placeholder="Quantidade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setQuantidade(t)}
        value={quantidade}
      />
      <TextInput
        placeholder="Validade"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setValidade(t)}
        value={validade}
      />
      <TextInput
        placeholder="Valor de custo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setValorCusto(t)}
        value={valorCusto}
      />
      <TextInput
        placeholder="Valor de venda"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setValorVenda(t)}
        value={valorVenda}
      />
      {/* <Button texto="Salvar" onClick={salvar}/> */}
      <Button texto="Salvar Imagem" onClick={sendImageDatabase}/>
      {uid ? <DeleteButton texto="Excluir" onClick={exclui} /> : null}

      {loading && <Loading />}
    </Container>
  );
};
export default Product;
