import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  /*  Asyncstorage    */
  const storeUserCache = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.error('AuthUserProvider: erro ao salvar o user no cache: ' + e);
    }
  };

  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('AuthUserProvider: erro ao ler o user no cache: ' + e);
    }
  };
  /*  fim Asyncstorage    */

  /* SignUp, SignIn, e SignOut */
  const signUp = async (email, pass) => {
    await auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(async () => {
        let userF = auth().currentUser;
        await firestore()
          .collection('users')
          .doc(userF.uid)
          .set(user)
          .then(() => {
            console.error('AuthUserProvider, signUp: usuário cadastrado.');
            userF
              .sendEmailVerification()
              .then(() => {
                Alert.alert(
                  'Informação',
                  'Foi enviado um email para: ' +
                    user.email +
                    ' para verificação.',
                );
              })
              .catch(e => {
                console.error('AuthUserProvider, signUp: ' + e);
              });
          })
          .catch(e => {
            console.error('AuthUserProvider, signUp: ' + e);
          });
      })
      .catch(e => {
        console.error('AuthUserProvider, signUp: ' + e);
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
  };

  const signIn = async (email, pass) => {
    console.log(email, pass);
    await auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        if (auth().currentUser.emailVerified) {
          getUser(pass);
        } else {
          Alert.alert(
            'Erro',
            'Você deve verificar o seu email para prosseguir.',
          );
          auth()
            .signOut()
            .then(() => {})
            .catch(e => {
              console.error('AuthUserProvider, signIn: ' + e);
            });
        }
        return 'foi';
      })
      .catch(e => {
        console.error('AuthUserProvider: erro em signIn: ' + e);
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
  };

  const signOut = () => {
    AsyncStorage.removeItem('user')
      .then(() => {
        auth()
          .signOut()
          .then(() => {})
          .catch(e => {
            console.error('AuthUserProvider, sigOut firebase: ' + e);
          });
      })
      .catch(e => {
        console.error('AuthUserProvider, sigOut cache: ' + e);
      });
  };
  /* Fim SignUp, SignIn, e SignOut */

  //busca os detalhes do user no nó users e faz cache
  const getUser = async pass => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          //console.log('Document data:', doc.data());
          setUser(doc.data());
          doc.data().pass = pass;
          storeUserCache(doc.data());
        } else {
          console.log('AuthUserProvider, getUser: documento não localizado');
        }
      })
      .catch(e => {
        console.error('AuthUserProvider: getUser: ' + e);
      });
  };

  return (
    <AuthUserContext.Provider
      value={{signUp, signIn, signOut, user, setUser, getUser, getUserCache}}>
      {children}
    </AuthUserContext.Provider>
  );
};
