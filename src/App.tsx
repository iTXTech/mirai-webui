import React from 'react';
import './App.css';
import Layout from "./Layout/Layout";
import PluginListPage from "./Page/PluginListPage/PluginListPage";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import ServerListPage from "./Page/ServerListPage/ServerListPage";
import {ConnectionPage} from "./Page/ConnectionPage/ConnectionPage";

function App() {
    return (
        <BrowserRouter>
                <Layout title={'Mirai Repo'}>
                    <Routes>
                        <Route path='/*' element={<PluginListPage/>} />
                        <Route path='/plugins' element={<PluginListPage/>} />
                        <Route path='/servers' element={<ServerListPage/>} />
                        <Route path='/connection' element={<ConnectionPage/>} />
                    </Routes>
                </Layout>
        </BrowserRouter>
    );
}

export default App;
