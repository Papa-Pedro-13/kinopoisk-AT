import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/scss/app.scss';

import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './features/store';
import HeaderApp from './components/HeaderApp/HeaderApp';

import { Layout } from 'antd';
const { Content, Footer } = Layout;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <HeaderApp />
        <Content
          style={{
            padding: '50px',
            minHeight: '100svh',
            maxWidth: '1240px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <App />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Avito tech frontend ©{new Date().getFullYear()} Created by Aleksandr
          Ostrovskii
        </Footer>
      </Layout>
    </Provider>
  </React.StrictMode>
);
