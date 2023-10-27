import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const TextInput = styled.TextInput`
  width: 90%;
  height: 30px;
  border-bottom-color: ${COLORS.primary};
  border-bottom-width: 2px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 5px;
`;

export const Text = styled.Text`
  font-size: 24px;
`;
