import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';

import {COLORS} from '../assets/colors';

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    color: COLORS.white,
  },
  button: {
    width: '95%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDark,
    fontSize: 16,
    marginTop: 10,
    borderRadius: 5,
    borderColor: COLORS.black,
    // width: '95%',
    // height: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: COLORS.primaryDark,
    // padding: 10,
    // margin: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: COLORS.white,
  },
});

const DeleteButton = ({texto, onClick}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={() => onClick()}>
      <Text style={styles.text}>{texto}</Text>
    </TouchableHighlight>
  );
};
export default DeleteButton;
