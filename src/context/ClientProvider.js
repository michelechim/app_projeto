import React, {useState, createContext} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const ClientContext = createContext({});

export const ClientProvider = ({children}) => {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    const unsubscribe = firestore()
      .collection('clients')
      .orderBy('nome')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            // console.log(doc.id, ' => ', doc.data());
            const val = {
              uid: doc.id,
              endereco: doc.data().endereco,
              nome: doc.data().nome,
              telefone: doc.data().telefone,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
            };
            d.push(val);
          });
          setClients(d);
        },
        e => {
          console.error('ClientProvider, getClients: ' + e);
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
          latitude: val.latitude,
          longitude: val.longitude,
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

  const deleteClient = async uid => {
    firestore()
      .collection('clients')
      .doc(uid)
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
