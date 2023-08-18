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
    const unsubscribeUsers = getUsers();
    return () => {
      unsubscribeUsers;
    };
  }, []);

  const getUsers = async () => {
    const usersCollection = firestore().collection('users');
    usersCollection.get().then(
      querySnapshot => {
        let d = [];
        querySnapshot.forEach(userDoc => {
          const userProfilesCollection = userDoc.ref.collection('profile');
          userProfilesCollection.get().then(profileQuerySnapshot => {
            profileQuerySnapshot.forEach(profileDoc => {
              const valor = {
                //uid: userDoc.data().id,
                nome: userDoc.data().nome,
                dataNasc: userDoc.data().dataNasc,
                endereco: userDoc.data().endereco,
                telefone: userDoc.data().telefone,
                email: userDoc.data().email,
                uid: profileDoc.id,
                codigo: profileDoc.data().codigo,
                dataCriacao: profileDoc.data().dataCriacao,
                lucratividade: profileDoc.data().lucratividade,
                nivel: profileDoc.data().nivel,
                senha: profileDoc.data().senha,
                usuario: profileDoc.data().usuario,
              };
              d.push(valor);
            });
          });
        });
        setUsers(d);
        // setData(d);
        console.log(d);
      },
      error => {
        console.log('Consultor, getUsers:' + error);
      },
    );

    return usersCollection;
  };

  const saveUser = async val => {
    console.log(val);
    await firestore()
      .collection('users')
      .doc(val.uid)
      .set(
        {
          nome: val.nome,
          dataNasc: val.dataNasc,
          endereco: val.endereco,
          telefone: val.telefone,
          email: val.email,
          uid: val.id,
          codigo: val.codigo,
          dataCriacao: val.dataCriacao,
          nivel: val.nivel,
          lucratividade: val.lucratividade,
          usuario: val.usuario,
          senha: val.senha,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        showToast('Dados salvos');
      })
      .catch(e => {
        console.error('ConsultorProvider, save:' + e);
      });
  };

  const deleteUser = async val => {
    // console.log('teste');
    // console.log(val);
    firestore()
      .collection('users')
      .doc(val)
      .delete()
      .then(() => {
        showToast('Consultor deletado!');
      })
      .catch(e => {
        console.error('ERROR: deleteUsers:' + e);
      });
  };

  return (
    <ConsultorContext.Provider value={{users, getUsers, saveUser, deleteUser}}>
      {children}
    </ConsultorContext.Provider>
  );
};

// const usersCollection = firestore().collection('users').doc(val.uid);
// usersCollection.add({
//   nome: val.nome,
//   dataNasc: val.dataNasc,
//   endereco: val.endereco,
//   telefone: val.telefone,
//   email: val.email,
// });

// const profileCollection = firestore.collection('profile');
// const newProfileRef = profileCollection.doc(val.uid);
// newProfileRef.set({
//   uid: val.id,
//   codigo: val.codigo,
//   dataCriacao: val.dataCriacao,
//   nivel: val.nivel,
//   lucratividade: val.lucratividade,
//   usuario: val.usuario,
//   senha: val.senha,
// });
