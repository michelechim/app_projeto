import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const TextInput = styled.TextInput`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  color: ${COLORS.black};
  width: 90%;
  height: auto;
  border-bottom-color: ${COLORS.primary};
  border-bottom-width: 2px;
  padding-bottom: 1px;
`;

export const Text = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  color: ${COLORS.black};
  width: 90%;
  height: auto;
  border-bottom-color: ${COLORS.primary};
  border-bottom-width: 2px;
  padding-bottom: 1px;
  padding-top: 20px;
`;