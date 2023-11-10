import React, {useContext} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';
import {AuthUserContext} from '../context/AuthUserProvider';

const Div = styled.View`
  width: 100%;
  height: auto;
  align-items: flex-end;
  justify-content: space-between;
  margin: 15px;
`;

const LogoutButton = ({navigation}) => {
  const {signOut} = useContext(AuthUserContext);

  return (
    <Div>
      <Icon
        name="exit-outline"
        size={25}
        color={COLORS.white}
        onPress={() => signOut()}
      />
    </Div>
  );
};
export default LogoutButton;