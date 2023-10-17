import React, {createContext, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const ConsultorContext = createContext({});

export const ConsultorProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    const unsubscribeUser = getUsers();
    return () => {
      unsubscribeUser;
    };
  }, []);

  const getUsers = async () => {
    const unsubscribe = firestore()
      .collection('users')
      .where ('marca','!=', null)
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
              marca: doc.data().marca,
              perfilCodigo: doc.data().perfilCodigo,
              perfilSenha: doc.data().perfilSenha,
              perfilUsuario: doc.data().perfilUsuario,
              perfilNivel: doc.data().perfilNivel,
              perfilLucratividade: doc.data().perfilLucratividade,
            };
            d.push(val);
          });
          setUsers(d);
          //console.log(d);
        },
        error => {
          console.log('ConsultorProvider, getUsers:' + error);
        },
      );
    return unsubscribe;
  };

  const saveUser = async (val) => {
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
          marca: val.marca,
          perfilCodigo: val.perfilCodigo,
          perfilSenha: val.perfilSenha,
          perfilUsuario: val.perfilUsuario,
          perfilNivel: val.perfilNivel,
          perfilLucratividade: val.perfilLucratividade,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        showToast('Dados salvos');
      })
      .catch(e => {
        console.error('ConsultorProvider, saveUser:' + e);
      });
  };

  const deleteUser = async (val) => {
    firestore()
      .collection('users')
      .doc(val)
      .delete()
      .then(() => {
        showToast('Consultor deletado!');
      })
      .catch(e => {
        console.error('ConsultorProvider, deleteUser:' + e);
      });
  };

  return (
    <ConsultorContext.Provider
      value={{users, getUsers, saveUser, deleteUser}}>
      {children}
    </ConsultorContext.Provider>
  );
};
