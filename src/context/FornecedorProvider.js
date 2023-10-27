import React, {createContext, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const FornecedorContext = createContext({});

export const FornecedorProvider = ({children}) => {
  const [supplier, setSuppliers] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    const unsubscribeSupplier = getSuppliers();
    return () => {
      unsubscribeSupplier;
    };
  }, []);

  const getSuppliers = async () => {
    const unsubscribe = firestore()
      .collection('supplier')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            const valor = {
              uid: doc.id,
              marca: doc.data().marca,
              responsavel: doc.data().responsavel,
              contato: doc.data().contato,
            };
            d.push(valor);
          });
          setSuppliers(d);
        },
        error => {
          console.log('FornecedorProvider, getsuppliers:' + error);
        },
      );
    return unsubscribe;
  };

  const saveSupplier = async (val) => {
    await firestore()
      .collection('supplier')
      .doc(val.uid)
      .set(
        {
          marca: val.marca,
          responsavel: val.responsavel,
          contato: val.contato,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        showToast('Dados salvos');
      })
      .catch(e => {
        console.error('supplierProvider, savesupplier:' + e);
      });
  };

  const deleteSupplier = async (val) => {
    firestore()
      .collection('supplier')
      .doc(val)
      .delete()
      .then(() => {
        showToast('Fornecedor deletado!');
      })
      .catch(e => {
        console.error('FornecedorProvider, deletesupplier:' + e);
      });
  };

  return (
    <FornecedorContext.Provider value={{supplier, getSuppliers, saveSupplier, deleteSupplier}}>
      {children}
    </FornecedorContext.Provider>
  );
};
