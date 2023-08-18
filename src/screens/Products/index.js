import React, {useState, useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';
import AddFloatButton from '../../components/AddFloatButton';
import {ProductContext} from '../../context/ProductProvider';

const Product = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {product} = useContext(ProductContext);

  useEffect(() => {
    setData(product);
    setLoading(false);
    console.log(product); // aparece vazio
  }, [product]);

  const routerProduct = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Product',
        params: {product: item},
      }),
    );
  };

  const routeAddProduct = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Product',
        params: {product: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routerProduct(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddProduct} />
      {loading && <Loading />}
    </Container>
  );
};

export default Product;
