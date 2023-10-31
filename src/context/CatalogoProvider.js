import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const CatalogoContext = createContext({});

export const CatalogoProvider = ({children}) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const unsubscribeProducts = getProducts();
    return () => {
      unsubscribeProducts;
    };
  }, []);

  const getProducts = async () => {
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
          //console.log(d);
        },
        error => {
          console.log('Produtos, getProducts:' + error);
        },
      );
    return unsubscribe;
  };

  return (
    <CatalogoContext.Provider value={{product, getProducts}}>
      {children}
    </CatalogoContext.Provider>
  );
};
