import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/colors';

import styled from 'styled-components/native';

const DivItem = styled.View`
  width: 100px;
  height: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
`;
const TextInput = styled.TextInput`
  font-size: 14px;
  color: ${COLORS.accent};
  width: 300px;
  height: auto;
  border-bottom-color: ${COLORS.primaryDark};
  border-bottom-width: 2px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export default function ({text, setSearch}) {
  return (
    <View>
      <DivItem>
        <Icon name="search" size={30} color={COLORS.primaryDark}/>
        <TextInput
          placeholder={text}
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setSearch(t)}
        />
      </DivItem>
    </View>
  );
};