// lib/context.js

import React, { createContext, useContext } from 'react';
import * as Api from './api';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    return <ApiContext.Provider value={Api}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
    return useContext(ApiContext);
};

