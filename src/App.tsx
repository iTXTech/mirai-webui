import React from 'react';
import './App.css';
import Layout from "./Layout/Layout";
import PluginListPage from "./Page/PluginListPage/PluginListPage";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import ServerListPage from "./Page/ServerListPage/ServerListPage";

function App() {
  return (
      <Layout title={'Mirai Repo'}>
          <BrowserRouter>
              <Routes>
                  <Route path='/*' element={<PluginListPage/>} />
                  <Route path='/plugins' element={<PluginListPage/>} />
                  <Route path='/servers' element={<ServerListPage/>} />
              </Routes>
          </BrowserRouter>
      </Layout>
  );
}

export default App;
