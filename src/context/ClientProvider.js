import React, {createContext, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const ClientContext = createContext({});

export const ClientProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    const unsubscribeUser = getClients();
    return () => {
      unsubscribeUser;
    };
  }, []);

  const getClients = async () => {
    const unsubscribe = firestore()
      .collection('users')
      .where ('dataNasc','!=', null)
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            const val = {
              uid: doc.id,
              nome: doc.data().nome,
              email: doc.data().email,
              endereco: doc.data().endereco,
              telefone: doc.data().telefone,
              dataNasc: doc.data().dataNasc,
              enderecoEntrega: doc.data().enderecoEntrega,
            };
            d.push(val);
          });
          setUsers(d);
          //console.log(d);
        },
        error => {
          console.log('ClientProvider, getClients:' + error);
        },
      );
    return unsubscribe;
  };

  const saveClient = async (val) => {
    await firestore()
      .collection('users')
      .doc(val.uid)
      .set(
        {
          uid: val.uid,
          nome: val.nome,
          email: val.email,
          endereco: val.endereco,
          telefone: val.telefone,
          dataNasc: val.dataNasc,
          enderecoEntrega: val.enderecoEntrega,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        showToast('Dados salvos');
      })
      .catch(e => {
        console.error('ClientProvider, saveClient:' + e);
      });
  };

  const deleteClient = async (val) => {
    // console.log('teste');
    // console.log(val);
    firestore()
      .collection('users')
      .doc(val)
      .delete()
      .then(() => {
        showToast('Cliente deletado!');
      })
      .catch(e => {
        console.error('ClientProvider, deleteClient:' + e);
      });
  };

  return (
    <ClientContext.Provider 
    value={{users, getClients, saveClient, deleteClient}}>
      {children}
    </ClientContext.Provider>
  );
};
