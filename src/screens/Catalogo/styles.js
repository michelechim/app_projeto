import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: ${COLORS.accent};
  width: 80%;
  height: auto;
  border-bottom-color: ${COLORS.black};
  border-bottom-width: 2px;
  padding-bottom: 1px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Image = styled.Image`
  align-self: center;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  border-color: black;
  background-color: ${COLORS.white};
`;