import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import {ClientProvider} from '../context/ClientProvider';
import {ProductProvider} from '../context/ProductProvider';
import {ConsultorProvider} from '../context/ConsultorProvider';
import {CatalogoProvider} from '../context/CatalogoProvider';
import {VendaProvider} from '../context/VendaProvider';
import {FornecedorProvider} from '../context/FornecedorProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
        <ApiProvider>
          <ClientProvider>
            <ProductProvider>
              <ConsultorProvider>
                <CatalogoProvider>
                  <VendaProvider>
                    <FornecedorProvider>
                      <Navigator />
                    </FornecedorProvider>
                  </VendaProvider>
                </CatalogoProvider>
              </ConsultorProvider>
            </ProductProvider>
          </ClientProvider>
        </ApiProvider>
    </AuthUserProvider>
  );
}
