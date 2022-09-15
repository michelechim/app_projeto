import React, {useState, createContext} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const ClientContext = createContext({});

export const ClientProvider = ({children}) => {
  const [clients, setClients] = useState([]);

  // const showToast = message => {
  //   ToastAndroid.show(message, ToastAndroid.SHORT);
  // };

  const getClients = async () => {
    const unsubscribe = firestore()
      .collection('clients')
      .orderBy('nome')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            const val = {
              uid: doc.data().id,
              endereco: doc.data().endereco,
              nome: doc.data().nome,
              telefone: doc.data().telefone,
            };
            d.push(val);
          });
          setClients(d);
        },
        e => {
          console.log('ClientProvider, getClients: ' + e);
        },
      );
    return unsubscribe;
  };

  const saveClient = async val => {
    await firestore()
      .collection('clients')
      .doc(val.uid)
      .set(
        {
          endereco: val.endereco,
          nome: val.nome,
          telefone: val.telefone,
        },
        {merge: true},
      )
      .then(() => {
        ToastAndroid.show('Dados salvos.', ToastAndroid.SHORT);
      })
      .catch(e => {
        console.error('ClienteProvider, saveClient: ' + e);
      });
  };

  const deleteClient = async val => {
    firestore()
      .collection('clients')
      .doc(val.uid)
      .delete()
      .then(() => {
        ToastAndroid.show('Cliente excluído.', ToastAndroid.SHORT);
      })
      .catch(e => {
        console.error('ClientProvider, deleteClient: ' + e);
      });
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        getClients,
        saveClient,
        deleteClient,
      }}>
      {children}
    </ClientContext.Provider>
  );
};
