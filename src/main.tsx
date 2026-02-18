import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import store from './store/store.ts';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth/authContext.tsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './style/theme.ts';
import { App } from './app/app.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Router>
            <StrictMode>
                <AuthProvider>
                    {/*<EventProvider>*/}
                        <ThemeProvider theme={theme}>
                            <App />
                        </ThemeProvider>
                    {/*</EventProvider>*/}
                </AuthProvider>
            </StrictMode>
        </Router>
    </Provider>
);
