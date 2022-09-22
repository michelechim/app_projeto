import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import {UserProvider} from '../context/UserProvider';
import {ClientProvider} from '../context/ClientProvider';
import {CompanyProvider} from '../context/CompanyProvider';
import {StockProvider} from '../context/StockProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <UserProvider>
        <ApiProvider>
          <ClientProvider>
            <StockProvider>
              <CompanyProvider>
                <Navigator />
              </CompanyProvider>
            </StockProvider>
          </ClientProvider>
        </ApiProvider>
      </UserProvider>
    </AuthUserProvider>
  );
}
