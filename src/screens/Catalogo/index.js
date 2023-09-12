import React, {useContext, useEffect, useState} from 'react';
import {Container, TextInput} from './styles';

import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {CatalogoContext} from '../../context/CatalogoProvider';

const Catalogo = ({route, navigation}) => {
  
  return (
    <Container>
      <Button texto="Exibir produtos disponiveis"/>
    </Container>
  );
};
export default Catalogo;
