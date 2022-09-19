import React, {useState, createContext} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const StockContext = createContext({});

export const StockProvider = ({children}) => {
  const [stocks, setStocks] = useState([]);

  const getStocks = async () => {
    const unsubscribe = firestore()
      .collection('stocks')
      .orderBy('nome')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            // console.log(doc.id, ' => ', doc.data());
            const val = {
              uid: doc.id,
              custo: doc.data().custo,
              nome: doc.data().nome,
              quantidade: doc.data().quantidade,
              validade: doc.data().validade,
              venda: doc.data().venda,
            };
            d.push(val);
          });
          setStocks(d);
        },
        e => {
          console.error('StockProvider, getStocks: ' + e);
        },
      );
    return unsubscribe;
  };

  const saveStock = async val => {
    await firestore()
      .collection('stocks')
      .doc(val.uid)
      .set(
        {
          custo: val.custo,
          nome: val.nome,
          quantidade: val.quantidade,
          validade: val.validade,
          venda: val.venda,
        },
        {merge: true},
      )
      .then(() => {
        ToastAndroid.show('Dados salvos.', ToastAndroid.SHORT);
      })
      .catch(e => {
        console.error('StockProvider, saveStock: ' + e);
      });
  };

  const deleteStock = async uid => {
    firestore()
      .collection('stocks')
      .doc(uid)
      .delete()
      .then(() => {
        ToastAndroid.show('Produtos excluído.', ToastAndroid.SHORT);
      })
      .catch(e => {
        console.error('StockProvider, deleteStock: ' + e);
      });
  };

  return (
    <StockContext.Provider value={{stocks, getStocks, saveStock, deleteStock}}>
      {children}
    </StockContext.Provider>
  );
};
