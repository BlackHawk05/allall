import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useStore } from 'effector-react'
import { v4 as uuid } from 'uuid';

import SignIn from './pages/Authentication/SignIn'
import Analytics from './pages/Dashboard/Analytics'
import Settings from './pages/Pages/Settings'
import NotFound from './pages/NotFound'
import { $user, saveUserData, getUserData } from '~/services/user'
import { clearTokens } from '~/services/auth';
import { IUserData } from './services/user/interfaces';

const App = () => {
    const preloader = document.getElementById('preloader')
    const navigate = useNavigate();
    const user = useStore($user);

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }

    useEffect(() => {
        if (!user) {
            if (!localStorage.getItem('accessToken')) {
                navigate('/auth/signin');
                localStorage.setItem('hash', uuid());
            } else {
                getUserData()
                .then((response: IUserData) => {
                    saveUserData(response);
                })
                .catch((err: Error) => {
                    clearTokens();
                });
            }
        }
    }, [preloader])

    return (
        //!loading &&
        <>
            <Routes>
                <Route path='/' element={<Analytics />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/auth/signin' element={<SignIn />} />
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </>
    )
}

export default App
