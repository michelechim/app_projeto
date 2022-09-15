import React, {useState, useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';
import AddFloatButton from '../../components/AddFloatButton';
import {ClientContext} from '../../context/ClientProvider';

const Clients = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {clients} = useContext(ClientContext);

  useEffect(() => {
    setData(clients);
    setLoading(false);
    //console.log(clients);
  }, [clients]);

  const routerClient = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Client',
        params: {client: item},
      }),
    );
  };

  const routeAddClient = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Client',
        params: {client: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routerClient(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddClient} />
      {loading && <Loading />}
    </Container>
  );
};

export default Clients;
