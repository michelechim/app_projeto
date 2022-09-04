import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import {COLORS} from '../assets/colors';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const recuperarSenha = () => {
    navigation.navigate('ForgotPassword');
  };

  const storeUserCache = async value => {
    try {
      value.pass = pass;
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      setLoading(false);
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{name: 'Estoques'}],
      //   }),
      // );
    } catch (e) {
      console.log('SignIn: erro em storeUserCache: ' + e);
    }
  };

  const getUser = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          storeUserCache(doc.data());
        } else {
          console.log('O documento não existe na base de dados!');
        }
      })
      .catch(e => {
        console.log('SignIn: erro em getUser: ' + e);
      });
  };

  const entrar = () => {
    if (email !== '' && pass !== '') {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          if (!auth().currentUser.emailVerified) {
            Alert.alert(
              'Erro',
              'Você deve verificar seu email para prosseguir.',
            );
            setLoading(false);
            return;
          }
          getUser();
        })
        .catch(e => {
          setLoading(false);
          console.log('SignIn: erro em entrar: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Erro na senha.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        });
    } else {
      Alert.alert('Erro', 'Por favor, digite email e senha.');
    }
  };

  const cadastrar = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
          <TextInput
            style={styles.input}
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
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="send"
            onChangeText={t => setPass(t)}
            onEndEditing={() => entrar()}
          />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
            Esqueceu a senha?
          </Text>
          <Button texto="Entrar" onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>ou</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta? </Text>
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>
              Cadastrar-se
            </Text>
          </View>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    margin: 2,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.primaryDark,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    backgroundColor: COLORS.accent,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  divOuHr: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: COLORS.primaryDark,
    borderBottomWidth: 2,
  },
  textOu: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    color: COLORS.black,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
    color: COLORS.black,
  },
  textCadastrarSe: {
    fontSize: 16,
    backgroundColor: COLORS.accent,
    color: COLORS.accentSecundary,
    marginLeft: 5,
  },
});
