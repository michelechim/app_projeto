import React, {createContext, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const VendaContext = createContext({});

export const VendaProvider = ({children}) => {
  const [order, setOrders] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    const unsubscribeOrder = getOrders();
    return () => {
      unsubscribeOrder;
    };
  }, []);

  const getOrders = async () => {
    const unsubscribe = firestore()
      .collection('order')
      .orderBy('dataCriacao')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            const valor = {
              uid: doc.id,
              nomeCliente: doc.data().nomeCliente,
              numeroPedido: doc.data().numeroPedido,
              dataCriacao: doc.data().dataCriacao,
              dataVenc: doc.data().dataVenc,
              parcelas: doc.data().parcelas,
              situacao: doc.data().situacao,
              itemMarca: doc.data().itemMarca,
              itemQuantidade: doc.data().itemQuantidade,
              itemUidProduto: doc.data().itemUidProduto,
              itemTotal: doc.data().itemTotal,
              pagamento: doc.data().pagamento,
            };
            d.push(valor);
          });
          setOrders(d);
        },
        error => {
          console.log('VendaProvider, getOrders:' + error);
        },
      );
    return unsubscribe;
  };

  const saveOrder = async (val) => {
    await firestore()
      .collection('order')
      .doc(val.uid)
      .set(
        {
          uid: val.uid,
          nomeCliente: val.nomeCliente,
          numeroPedido: val.numeroPedido,
          dataCriacao: val.dataCriacao,
          dataVenc: val.dataVenc,
          parcelas: val.parcelas,
          situacao: val.situacao,
          itemMarca: val.itemMarca,
          itemQuantidade: val.itemQuantidade,
          itemUidProduto: val.itemUidProduto,
          itemTotal: val.itemTotal,
          pagamento: val.pagamento,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        showToast('Dados salvos');
      })
      .catch(e => {
        console.error('OrderProvider, saveOrder:' + e);
      });
  };

  const deleteOrder = async (val) => {
    firestore()
      .collection('order')
      .doc(val)
      .delete()
      .then(() => {
        showToast('Venda deletado!');
      })
      .catch(e => {
        console.error('VendaProvider, deleteOrder:' + e);
      });
  };

  return (
    <VendaContext.Provider value={{order, getOrders, saveOrder, deleteOrder}}>
      {children}
    </VendaContext.Provider>
  );
};
