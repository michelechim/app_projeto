import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <Navigator />
    </AuthUserProvider>
  );
}
