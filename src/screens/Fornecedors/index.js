import React, {useState, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import SearchBar from '../../components/SearchBar';
import {FornecedorContext} from '../../context/FornecedorProvider';

const Fornecedor = ({navigation}) => {
  const {supplier} = useContext(FornecedorContext);
  const [supplierTemp, setSupplierTemp] = useState([]);

  const filterByName = text => {
    if (text !== ''){
      let a = [];

      a.push(
        ...supplier.filter(e =>
          e.marca.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      if (a.length > 0) {
        setSupplierTemp(a);
      }
    }else {
      setSupplierTemp([]);
    }
  };

  const routerFornecedor = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Fornecedor',
        params: {fornecedor: item},
      }),
    );
  };

  return (
    <Container>
      <SearchBar text="Digite o nome da marca" setSearch={filterByName} />
      <FlatList
        data={supplierTemp.length > 0 ? supplierTemp : supplier}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routerFornecedor(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={() => routerFornecedor(null)} />
    </Container>
  );
};

export default Fornecedor;
