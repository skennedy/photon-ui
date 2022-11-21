
import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import UploadSession from './components/UploadSession';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/upload/:uploadId' element={<UploadSession/>}/>
        </RouterRoutes>
    );
};

export default Routes;