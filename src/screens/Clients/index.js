import React, {useState, useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';
import AddFloatButton from '../../components/AddFloatButton';
import {ClientContext} from '../../context/ClientProvider';

const Client = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {users} = useContext(ClientContext);

  useEffect(() => {
    setData(users);
    setLoading(false);
    // console.log(users); //aparece vazio
  }, [users]);

  const routerUser = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Client',
        params: {users: item},
      }),
    );
  };

  const routeAddUser = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Client',
        params: {users: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routerUser(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddUser} />
      {loading && <Loading />}
    </Container>
  );
};

export default Client;
