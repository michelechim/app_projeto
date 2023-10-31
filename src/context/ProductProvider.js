import React, {createContext, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const ProductContext = createContext({});

export const ProductProvider = ({children}) => {
  const [product, setProduct] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    const unsubscribeProduct = getProduct();
    return () => {
      unsubscribeProduct;
    };
  }, []);

  const getProduct = async () => {
    const unsubscribe = firestore()
      .collection('product')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            const valor = {
              uid: doc.data().uid,
              fornecedor: doc.data().fornecedor,
              img: doc.data().img,
              nome: doc.data().nome,
              quantidade: doc.data().quantidade,
              validade: doc.data().validade,
              valorCusto: doc.data().valorCusto,
              valorVenda: doc.data().valorVenda,
            };
            d.push(valor);
          });
          setProduct(d);
          // setData(d);
          console.log(d);
        },
        error => {
          console.log('Produto, getProduct:' + error);
        },
      );

    return unsubscribe;
  };
  const saveProduct = async val => {
    console.log(val);
    await firestore()
      .collection('product')
      .doc(val.uid)
      .set(
        {
          uid: val.uid,
          fornecedor: val.fornecedor,
          img: val.img,
          nome: val.nome,
          quantidade: val.quantidade,
          validade: val.validade,
          valorCusto: val.valorCusto,
          valorVenda: val.valorVenda,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        showToast('Dados salvos');
      })
      .catch(e => {
        console.error('ProductProvider, save:' + e);
      });
  };
  const deleteProduct = async (uid,path) => {
    try{
      await firestore().collection('product').doc(uid).delete();
      await storage().ref(path).delete();
      return true;
    }catch(e) {
      console.error('ProductProvider: deleteProduct:' , e);
      return false;
    }
  };

  return (
    <ProductContext.Provider
      value={{product, getProduct, saveProduct, deleteProduct}}>
      {children}
    </ProductContext.Provider>
  );
};
