import React, {useState, useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';
import AddFloatButton from '../../components/AddFloatButton';
import {StockContext} from '../../context/StockProvider';

const Stocks = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {stocks} = useContext(StockContext);

  useEffect(() => {
    setData(stocks);
    setLoading(false);
    //console.log(stocks);
  }, [stocks]);

  const routerStock = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Stock',
        params: {stock: item},
      }),
    );
  };

  const routeAddStock = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Stock',
        params: {stock: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routerStock(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddStock} />
      {loading && <Loading />}
    </Container>
  );
};

export default Stocks;
