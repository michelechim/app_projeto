import React, {useState, createContext, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribeUsers = getUsers();
    return () => {
      unsubscribeUsers;
    };
  }, []);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getUsers = async () => {
    const unsubscribe = firestore()
      .collection('users')
      .orderBy('nome')
      .onSnapshot(
        //inscrevendo um listener
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' => ', doc.data());
            const user = {
              id: doc.id,
              nome: doc.data().nome,
              email: doc.data().email,
            };
            d.push(user);
          });
          //console.log(d);
          setUsers(d);
        },
        e => {
          console.error('UserProvider, getUsers: ' + e);
        },
      );

    return unsubscribe;
  };

  const saveUser = async user => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .set(
        {
          nome: user.nome,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Dados salvos.');
      })
      .catch(e => {
        console.error('UserProvider, saveUser: ' + e);
      });
  };

  const deleteUser = async val => {
    firestore()
      .collection('users')
      .doc(val.uid)
      .delete()
      .then(() => {
        ToastAndroid.show('Usuario excluído.', ToastAndroid.SHORT);
      })
      .catch(e => {
        console.error('UserProvider, deleteUser: ' + e);
      });
  };

  return (
    <UserContext.Provider value={{users, getUsers, saveUser, deleteUser}}>
      {children}
    </UserContext.Provider>
  );
};
