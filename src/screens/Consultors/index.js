import React, {useState, useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';
import AddFloatButton from '../../components/AddFloatButton';
import {ConsultorContext} from '../../context/ConsultorProvider';

const Consultor = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {users} = useContext(ConsultorContext);

  useEffect(() => {
    setData(users);
    setLoading(false);
    // console.log(users); //aparece vazio
  }, [users]);

  const routerUser = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Consultor',
        params: {users: item},
      }),
    );
  };

  const routeAddUser = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Consultor',
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

export default Consultor;
