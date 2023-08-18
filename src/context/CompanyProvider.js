import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';
import {ApiContext} from '../context/ApiProvider';

export const CompanyContext = createContext({});

export const CompanyProvider = ({children}) => {
  const [companies, setCompanies] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  console.log('companyProvider');
  console.log(api);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getCompanies = async () => {
    try {
      const response = await api.get('/companies');
      // console.log('Dados buscados via API');
      // console.log(response.data);
      // console.log(response.data.documents);
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/app-projeto-30539/databases/(default)/documents/companies/',
        );
        data.push({
          nome: d.fields.nome.stringValue,
          lucratividade: d.fields.lucratividade.stringValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => b.nome.localeCompare(a.nome));
      setCompanies(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API.');
      console.log(response);
    }
  };

  const saveCompany = async val => {
    try {
      await api.post('/companies/', {
        fields: {
          nome: {stringValue: val.nome},
          lucratividade: {stringValue: val.lucratividade},
        },
      });
      showToast('Dados salvos.');
      getCompanies();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao saveCompany via API.');
      console.log(response);
    }
  };

  const updateCompany = async val => {
    //console.log(val);
    try {
      await api.patch('/companies/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          lucratividade: {stringValue: val.lucratividade},
        },
      });
      showToast('Dados salvos.');
      getCompanies();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao updateCompany via API.');
      console.log(response);
    }
  };

  const deleteCompany = async val => {
    try {
      await api.delete('/companies/' + val);
      showToast('Fornecedor excluído.');
      getCompanies();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deleteCompany via API.');
      console.log(response);
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        companies,
        getCompanies,
        saveCompany,
        updateCompany,
        deleteCompany,
      }}>
      {children}
    </CompanyContext.Provider>
  );
};
