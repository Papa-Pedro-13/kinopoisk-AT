import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/scss/app.scss';

import { Layout } from 'antd';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './features/store';
const { Header, Content, Footer } = Layout;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <Header />
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
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Provider>
  </React.StrictMode>
);
