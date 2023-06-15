import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useStore } from 'effector-react'

import SignIn from './pages/Authentication/SignIn'
import Analytics from './pages/Dashboard/Analytics'
import Settings from './pages/Pages/Settings'
import NotFound from './pages/NotFound'
import { UserStore } from '~/services/user'
import { AuthService } from '~/services/auth';

const App = () => {
    const preloader = document.getElementById('preloader')
    const navigate = useNavigate();
    const user = useStore(UserStore.$user);

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }

    useEffect(() => {
        
        if (!user) {
            const runCheck = async () => {
                const check = await AuthService.checkAuth();
            
                if (!check) {
                    navigate('/auth/signin');
                }
            }

            runCheck();
        }
    }, [preloader]);

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
