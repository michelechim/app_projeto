import React, {useState, useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import SearchBar from '../../components/SearchBar';
import {ConsultorContext} from '../../context/ConsultorProvider';

const Consultor = ({navigation}) => {
  const {users} = useContext(ConsultorContext);
  const [usersTemp, setUsersTemp] = useState([]);

  const filterByName = text => {
    if (text !== ''){
      let a = [];

      a.push(
        ...users.filter(e =>
          e.marca.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      if (a.length > 0) {
        setUsersTemp(a);
      }
    }else {
      setUsersTemp([]);
    }
  };

  const routerUser = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Consultor',
        params: {users: item},
      }),
    );
  };

  return (
    <Container>
      <SearchBar text="Digite o nome da marca" setSearch={filterByName} />
      <FlatList
        data={usersTemp.length > 0 ? usersTemp : users}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routerUser(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={() => routerUser(null)} />
    </Container>
  );
};

export default Consultor;
