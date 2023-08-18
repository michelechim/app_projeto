import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {ClientContext} from '../../context/ClientProvider';

const MapClientsTab = () => {
  const [mapType, setMapType] = useState('standard');
  const [markers, setMarkers] = useState([]);
  const {clients} = useContext(ClientContext);

  useEffect(() => {
    //console.log(clients);
    let m = [];
    clients.map(c => {
      //console.log(c);
      m.push({
        key: c.uid,
        coords: {
          latitude: Number('-31.766296792'),
          longitude: Number(c.longitude),
        },
        title: c.nome,
        description: c.endereco,
        image: require('../../assets/images/maps/person_map_xxxhdpi.png'),
        // image: require('../../assets/images/person_map_accent.png'),
      });
    });
    setMarkers(m);
  }, [clients]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          Alert.alert(
            'Coordenadas',
            'latitude= ' +
              e.nativeEvent.coordinate.latitude +
              ' longitude= ' +
              e.nativeEvent.coordinate.longitude,
          );
        }}
        initialRegion={{
          //região onde deve focar o mapa na inicialização
          latitude: -31.766108372781073,
          longitude: -52.35215652734042,
          latitudeDelta: 0.015, //baseado na documentação
          longitudeDelta: 0.0121, //baseado na documentação
        }}>
        {markers.map(marker => {
          return (
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
              draggable
              image={marker.image}
            />
          );
        })}
      </MapView>
    </View>
  );
};
export default MapClientsTab;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
