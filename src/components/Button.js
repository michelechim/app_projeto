import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';
import {COLORS} from '../assets/colors';

const Button = ({texto, onClick}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={() => onClick()}>
      <Text style={styles.text}>{texto}</Text>
    </TouchableHighlight>
  );
};
export default Button;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: COLORS.white,
  },
  button: {
    width: '95%',
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    fontSize: 16,
    marginTop: 10,
    borderRadius: 5,
  },
});
