import React, {useState, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import SearchBar from '../../components/SearchBar';
import {ClientContext} from '../../context/ClientProvider';

const Client = ({navigation}) => {
  const {users} = useContext(ClientContext);
  const [userTemp, setUserTemp] = useState([]);

  const filterByName = text => {
    if (text !== ''){
      let a = [];

      a.push(
        ...users.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      if (a.length > 0) {
        setUserTemp(a);
      }
    }else {
      setUserTemp([]);
    }
  };

  const routerUser = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Client',
        params: {users: item},
      }),
    );
  };

  return (
    <Container>
        <SearchBar text="Digite o nome do cliente" setSearch={filterByName} />
        <FlatList
          data={userTemp.length > 0 ? userTemp : users}
          renderItem={({item}) => (
            <Item item={item} onPress={() => routerUser(item)} key={item.uid} />
          )}
          keyExtractor={item => item.uid}
        />
        <AddFloatButton onClick={() => routerUser(null)} />
    </Container>
  );
};

export default Client;
