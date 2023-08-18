import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import {UserProvider} from '../context/UserProvider';
import {ClientProvider} from '../context/ClientProvider';
import {CompanyProvider} from '../context/CompanyProvider';
import {StockProvider} from '../context/StockProvider';
import {ProductProvider} from '../context/ProductProvider';
import {ConsultorProvider} from '../context/ConsultorProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <UserProvider>
        <ApiProvider>
          <ClientProvider>
            <StockProvider>
              <ProductProvider>
                <CompanyProvider>
                  <ConsultorProvider>
                    <Navigator />
                  </ConsultorProvider>
                </CompanyProvider>
              </ProductProvider>
            </StockProvider>
          </ClientProvider>
        </ApiProvider>
      </UserProvider>
    </AuthUserProvider>
  );
}
