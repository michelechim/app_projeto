import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  // //teste novo
  // const getUsers = () => {
  //   const unsubscribe = firestore()
  //     .collection('users')
  //     .onSnapshot(
  //       // inscrevendo um listener
  //       querySnapshot => {
  //         let d = [];
  //         querySnapshot.forEach(doc => {
  //           //doc.data() is never undefined for query doc snapshot
  //           //console.log(doc.id, ' => ', doc.data());
  //           const val = {
  //             id: doc.id,
  //             nome: doc.data().nome,
  //             email: doc.data().email,
  //           };
  //           d.push(val);
  //         });
  //         // console.log(d);
  //         setUser(d);
  //       },
  //       e => {
  //         console.log('Home, getUsers: ' + e);
  //       },
  //     );
  //   return unsubscribe;
  // };

  //SignOut
  const sigOut = () => {
    AsyncStorage.removeItem('user')
      .then(() => {
        auth()
          .sigOut()
          .then(() => {})
          .catch(e => {
            console.error('AuthUserProvider, sigOut firebase: ' + e);
          });
      })
      .catch(e => {
        console.error('AuthUserProvider, sigOut cache: ' + e);
      });
  };

  return (
    <AuthUserContext.Provider value={{user, setUser, sigOut}}>
      {children}
    </AuthUserContext.Provider>
  );
};
