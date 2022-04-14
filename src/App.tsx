import React from 'react';
import './App.css';
import Layout from "./Layout/Layout";
import PluginListPage from "./Page/PluginListPage/PluginListPage";

function App() {
  return (
      <Layout title={'Mirai Repo'}>
        <PluginListPage/>
      </Layout>
  );
}

export default App;
