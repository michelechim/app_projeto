import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const sigOut = () => {
    //setUser(null);
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

  return (
    <AuthUserContext.Provider value={{user, setUser, sigOut}}>
      {children}
    </AuthUserContext.Provider>
  );
};
