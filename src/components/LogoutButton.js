import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import RNRestart from 'react-native-restart';

const ButtonExit = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
const Image = styled.Image`
  width: 45px;
  height: 45px;
`;

const LogoutButton = () => {
  const signOut = () => {
    AsyncStorage.removeItem('user')
      .then(() => {
        auth()
          .signOut()
          .then(() => {})
          .catch(e => {
            console.log('LogoutButton, singOut em auth singOut: ' + e);
          });
        RNRestart.Restart();
      })
      .catch(e => {
        console.log('LogoutButton, singOut em removeItem: ' + e);
      });
  };
  return (
    <ButtonExit onPress={signOut} underlayColor="transparent">
      <Image
        source={require('../assets/images/exit.png')}
        accessibilitylabel="botão sair"
      />
    </ButtonExit>
  );
};

export default LogoutButton;
