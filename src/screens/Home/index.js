/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Item from './Item';
import {Container, FlatList} from './styles';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import Loading from '../../components/Loading';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = () => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(
        // inscrevendo um listener
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            //doc.data() is never undefined for query doc snapshot
            //console.log(doc.id, ' => ', doc.data());
            const user = {
              id: doc.id,
              nome: doc.data().nome,
              email: doc.data().email,
            };
            d.push(user);
          });
          // console.log(d);
          setData(d);
          setLoading(false);
        },
        e => {
          console.log('Home, getUsers: ' + e);
        },
      );
    return unsubscribe;
  };

  useEffect(() => {
    navigation.setOptions({
      //headerLeft: false,
      title: 'Usuários',
      headerStyle: {background: COLORS.primary},
      headerTitleStyle: {color: COLORS.accentSecundary},
      headerRight: () => <LogoutButton nav={navigation} />,
    });
    const unsubscribe = getUsers();

    //componentDidUnmount
    return () => {
      console.log('ao desmontar o compomente HOME');
      unsubscribe();
    };
  }, []);

  const routerUser = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'User',
        params: {user: item},
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
        keyExtractor={item => item.id}
      />
      {loading && <Loading />}
    </Container>
  );
};
export default Home;
