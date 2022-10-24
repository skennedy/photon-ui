
import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
        </RouterRoutes>
    );
};

export default Routes;