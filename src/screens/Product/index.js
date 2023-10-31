import React, {useContext, useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import {Alert, ToastAndroid} from 'react-native';
import {Container, TextInput, Image, Text} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import CustomModalFornecedor from '../../components/CustomModalFornecedor';
import RadioButton from '../../components/RadioButton';
import Loading from '../../components/Loading';
import {ProductContext} from '../../context/ProductProvider';
import {FornecedorContext} from '../../context/FornecedorProvider';

const Product = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  //const [descricao, setDescricao] = useState('');
  const [fornecedor, setFornecedor] = useState([]);
  const [modalFornecedorVisible, setModalFornecedorVisible] = useState(false);
  const [img, setImg] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [valorCusto, setValorCusto] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [loading, setLoading] = useState(false);
  const {supplier} = useContext(FornecedorContext);
  const {saveProduct, deleteProduct} = useContext(ProductContext);

  useEffect(() => {
    console.log(route.params.product);
    setUid('');
    //setDescricao('');
    setFornecedor('Selecione o fornecedor');
    setImg('');
    setNome('');
    setQuantidade('');
    setValidade('');
    setValorCusto('');
    setValorVenda('');
    if (route.params.product) {
      setUid(route.params.product.uid);
      //setDescricao(route.params.product.descricao);
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
          const pathStorageToDelete = `images/produtos/${uid}.${nome}.jpeg`;
          if ( await deleteProduct(uid, pathStorageToDelete)){
            ToastAndroid.show(
              'Ordem dada é ordem cumprida',
              ToastAndroid.LONG,
            );
          } else {
            ToastAndroid.show('Deu problema ao excluir.', ToastAndroid.SHORT);
          }
          setLoading(false);
          navigation.goBack();
        },
      },
    ],
    );
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

  const sendDados = async (urlCompleta) => {
    // console.log(nome);
    if (
      uid &&
      //descricao &&
      fornecedor &&
      quantidade &&
      nome &&
      validade &&
      valorCusto &&
      valorVenda
    ) {
      let product = {};
      product.uid = uid;
      //product.descricao = descricao;
      product.fornecedor = fornecedor;
      product.img = urlCompleta;
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
  
  async function sendImageDatabase() {
    let imageRefact = await ImageResizer.createResizedImage(
      img, 200, 350, 'PNG', 100,
    );
    const urlImageParcial = `images/produtos/${uid}.${nome}.jpeg`;
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
      sendDados(urlCompleta);
    })
    .catch(e => {
      console.log(' Catch  Task =>');
      Alert.alert('Erro !', 'Impossivel salvar seu produto, tente mais tarde!!');
      console.error(e);
    });
  }
  
  const selecionarFornecedor = (val) =>{
    setFornecedor(val);
    setModalFornecedorVisible(!modalFornecedorVisible);
  };

  return (
    <Container>
      <Image  source={{ uri: img !== '' ? img
        : 'https://cdn.pixabay.com/photo/2019/05/25/14/47/eye-4228531_960_720.png',
      }} />
      <Button texto="Selecione a Imagem" onClick={selectImage}/>
      <Button texto="Tirar foto" onClick={takePicker}/>

      <Text
        placeholder = "Selecione um fornecedor"
        onPress={()=> setModalFornecedorVisible(!modalFornecedorVisible)}>
        {fornecedor}
      </Text>

      <TextInput
        placeholder="Código do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setUid(t)}
        value={uid}
      />
      {/* <TextInput
        placeholder="Descrição do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDescricao(t)}
        value={descricao}
      /> */}
      <TextInput
        placeholder="Informe o nome e fragrância do produto"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      {/* <TextInput
        placeholder="Fornecedor"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setFornecedor(t)}
        value={fornecedor}
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
        value= {valorCusto}
      />
      <TextInput
        placeholder="Valor de venda"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setValorVenda(t)}
        value={valorVenda}
      />
      <Button texto="SALVAR PRODUTO" onClick={sendImageDatabase}/>
      {uid ? <DeleteButton texto="EXCLUIR" onClick={exclui} /> : null}
      
      <CustomModalFornecedor
        visible={modalFornecedorVisible}
        closeAction={() => setModalFornecedorVisible(!modalFornecedorVisible)}>
          {supplier.map((o) => {
            return (
              <RadioButton 
                key={o.uid}
                label={o.marca}
                selected={o.marca === fornecedor ? true : false }
                onClick={selecionarFornecedor}
              />
            );
          })}
      </CustomModalFornecedor>

      {loading && <Loading />}
    </Container>
  );
};
export default Product;
