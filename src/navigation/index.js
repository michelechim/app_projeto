import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import {UserProvider} from '../context/UserProvider';
import {ClientProvider} from '../context/ClientProvider';
import {ProductProvider} from '../context/ProductProvider';
import {ConsultorProvider} from '../context/ConsultorProvider';
import {CatalogoProvider} from '../context/CatalogoProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <UserProvider>
        <ApiProvider>
          <ClientProvider>
              <ProductProvider>
                <ConsultorProvider>
                  <CatalogoProvider>
                    <Navigator />
                  </CatalogoProvider>
                </ConsultorProvider>
              </ProductProvider>
          </ClientProvider>
        </ApiProvider>
      </UserProvider>
    </AuthUserProvider>
  );
}
