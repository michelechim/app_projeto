import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const TextInput = styled.TextInput`
  width: 90%;
  height: auto;
  border-bottom-color: ${COLORS.primary};
  border-bottom-width: 2px;
 // padding-left: 1px;
  padding-bottom: 1px;
  //margin-bottom: 1px;
`;

export const Text = styled.Text`
  font-size: 18px;
`;

export const Image = styled.Image`
  align-self: center;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  border-color: black;
  background-color: ${COLORS.grey};
`;