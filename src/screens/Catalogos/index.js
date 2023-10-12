import React, {useState, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, Div, FlatList} from './styles';
import Item from './Item';
import SearchBar from '../../components/SearchBar';
import {CatalogoContext} from '../../context/CatalogoProvider';


const Catalogo = ({navigation}) => {
  const {product} = useContext(CatalogoContext);
  const [productTemp, setProductTemp] = useState([]);

  const filterByName = text => {
    if (text !== ''){
      let a = [];

      a.push(
        ...product.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      if (a.length > 0) {
        setProductTemp(a);
      }
    }else {
      setProductTemp([]);
    }
  };

  const routerProduct = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Catalogo',
        params: {catalogo: item},
      }),
    );
  };

  return (
    <Container>
        <SearchBar text="Digite o nome do produto" setSearch={filterByName} />
      <FlatList
        data={productTemp.length > 0 ? productTemp : product}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routerProduct(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
    </Container>
  );
};

export default Catalogo;
