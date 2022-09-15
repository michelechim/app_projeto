import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {ClientProvider} from '../context/ClientProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ClientProvider>
        <Navigator />
      </ClientProvider>
    </AuthUserProvider>
  );
}
