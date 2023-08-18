import React, {createContext, useState} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState();

  const getApi = () => {
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          const apiLocal = create({
            baseURL:
              'https://firestore.googleapis.com/v1/projects/app-projeto-30539/databases/(default)/documents/',
            headers: {Authorization: 'Bearer ' + idToken},
          });

          //middeleware
          apiLocal.addRequestTransform(response => {
            if (!response.ok) {
              throw response;
            }
          });
          setApi(apiLocal);
        })
        .catch(e => {
          console.error('ApiProvider, getApi' + e);
        });
    }
  };
  return (
    <ApiContext.Provider value={{api, getApi}}>{children}</ApiContext.Provider>
  );
};
