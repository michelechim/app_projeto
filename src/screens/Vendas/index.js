import React, {useState, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import SearchBar from '../../components/SearchBar';
import {VendaContext} from '../../context/VendaProvider';

const Venda = ({navigation}) => {
  const {order} = useContext(VendaContext);
  const [orderTemp, setOrderTemp] = useState([]);

  const filterByName = text => {
    if (text !== ''){
      let a = [];
      a.push(
        ...order.filter(e =>
          e.nomeCliente.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      if (a.length > 0) {
        setOrderTemp(a);
      }
    }else {
      setOrderTemp([]);
    }
  };

  const routerVenda = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Venda',
        params: {venda: item},
      }),
    );
  };

  return (
    <Container>
      <SearchBar text="Digite o nome do cliente" setSearch={filterByName} />
      <FlatList
        data={orderTemp.length > 0 ? orderTemp : order}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routerVenda(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={() => routerVenda(null)} />
    </Container>
  );
};

export default Venda;
