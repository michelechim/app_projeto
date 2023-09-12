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
              //dataNasc: doc.data().dataNasc,
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
          //dataNasc: val.dataNasc,
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

//Coleção e subcoleção

  // const getUsers = async () => {
  //   const usersCollection = firestore().collection('users');
  //   usersCollection.get().then(
  //     querySnapshot => {
  //       let d = [];
  //       querySnapshot.forEach(userDoc => {
  //         const userProfilesCollection = userDoc.ref.collection('profile');
  //         userProfilesCollection.get().then(profileQuerySnapshot => {
  //           profileQuerySnapshot.forEach(profileDoc => {
  //             const valor = {
  //               //uid: userDoc.data().id,
  //               nome: userDoc.data().nome,
  //               dataNasc: userDoc.data().dataNasc,
  //               endereco: userDoc.data().endereco,
  //               telefone: userDoc.data().telefone,
  //               email: userDoc.data().email,
  //               uid: profileDoc.id,
  //               codigo: profileDoc.data().codigo,
  //               dataCriacao: profileDoc.data().dataCriacao,
  //               lucratividade: profileDoc.data().lucratividade,
  //               nivel: profileDoc.data().nivel,
  //               senha: profileDoc.data().senha,
  //               usuario: profileDoc.data().usuario,
  //             };
  //             d.push(valor);
  //           });
  //         });
  //       });
  //       setUsers(d);
  //       setProfile(d);
  //       //setData(d);
  //       console.log(d);
  //     },
  //     error => {
  //       console.log('Consultor, getUsers:' + error);
  //     },
  //   );

  //   return usersCollection;
  // };

  // const saveUser = async () => {
  //   const colecaoRef = firestore().collection('users');
  //   const profileRef = colecaoRef.doc('uid').collection('profile');
  //     colecaoRef && profileRef.add({
  //       nome: users.nome,
  //       dataNasc: users.dataNasc,
  //       endereco: users.endereco,
  //       telefone: users.telefone, 
  //       email: users.email,
  //       uid: profile.id,
  //       codigo: profile.codigo,
  //       dataCriacao: profile.dataCriacao,
  //       nivel: profile.nivel,
  //       lucratividade: profile.lucratividade,
  //       usuario: profile.usuario,
  //       senha: profile.senha,  
  //   })
  //   .then(docRef => {
  //     console.log('Dados salvos ');
  //   })
  //   .catch(error => {
  //     console.error('ConsultorProvider, save:' + e);
  //   });
  // }
