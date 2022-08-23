//import React, {useState} from 'react';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';
//import Button from '../components/Button';

const Home = props => {
  // const [contador, setContador] = useState(0);

  console.log(props);

  // const contar = () => {
  //   setContador(contador + 1);
  // };
  // const reset = () => {
  //   setContador(0);
  // };

  return (
    <View>
      <Text style={styles.txt}>Bem vindo</Text>
      <Text style={styles.texto}>EM CONSTRUÇÃO!!!</Text>
      {/* <Text style={styles}.texto}>Contador = {contador}</Text>
      <Text style={styles.texto}>TESTE</Text>
      <Button texto="Contar" onClick={contar} />
      <Button texto="Reset" onClick={reset} />  */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    width: '95%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    marginTop: 10,
  },
  texto: {
    textAlign: 'center',
    width: '95%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.primary,
    fontSize: 30,
  },
});
