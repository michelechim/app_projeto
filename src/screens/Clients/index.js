import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ClientsTab from './ClientsTab';
import MapClientsTab from './MapClientsTab';
import {COLORS} from '../../assets/colors';

const Tab = createBottomTabNavigator();

const Clients = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        initialRouteName: 'ClientsTab',
        activeTintColor: COLORS.primary,
        labelStyle: {
          height: 18,
          fontSize: 12,
          margin: 0,
          fontWeight: 'bold',
        },
        style: {backgroundColor: COLORS.white},
        showIcon: true,
      }}

      //pedaco de codigo com erro
      // tabBarOptions={{
      //   initialRouteName: 'ClientsTab',
      //   activeTintColor: COLORS.primary,
      //   labelStyle: {
      //     height: 18,
      //     fontSize: 12,
      //     margin: 0,
      //     fontWeight: 'bold',
      //   },
      //   style: {backgroundColor: COLORS.white},
      //   showIcon: true,
      // }}
    >
      <Tab.Screen
        name="ClientesTab"
        component={ClientsTab}
        options={{
          tabBarLabel: 'Clientes',
          tabBarIcon: () => (
            <Icon name="people" color={COLORS.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="MapClientesTab"
        component={MapClientsTab}
        options={{
          tabBarLabel: 'Localização',
          tabBarIcon: () => (
            <Icon name="map" color={COLORS.primary} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Clients;

// import React, {useState, useContext, useEffect} from 'react';
// import {CommonActions} from '@react-navigation/native';

// import {Container, FlatList} from './styles';
// import Item from './Item';
// import Loading from '../../components/Loading';
// import AddFloatButton from '../../components/AddFloatButton';
// import {ClientContext} from '../../context/ClientProvider';

// const Clients = ({navigation}) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const {clients} = useContext(ClientContext);

//   useEffect(() => {
//     setData(clients);
//     setLoading(false);
//     //console.log(clients);
//   }, [clients]);

//   const routerClient = item => {
//     console.log(item);
//     navigation.dispatch(
//       CommonActions.navigate({
//         name: 'Client',
//         params: {client: item},
//       }),
//     );
//   };

//   const routeAddClient = () => {
//     navigation.dispatch(
//       CommonActions.navigate({
//         name: 'Client',
//         params: {client: null},
//       }),
//     );
//   };

//   const renderItem = ({item}) => (
//     <Item item={item} onPress={() => routerClient(item)} />
//   );

//   return (
//     <Container>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.uid}
//       />
//       <AddFloatButton onClick={routeAddClient} />
//       {loading && <Loading />}
//     </Container>
//   );
// };

// export default Clients;
