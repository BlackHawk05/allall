import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useStore } from 'effector-react'
import { UserStore } from '~/services/user'
import { AuthService } from '~/services/auth';

import SignIn from './pages/SignIn'
import Main from './pages/Main'
import NotFound from './pages/NotFound'
import Config from './pages/Config'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/config' element={<Config />}>
                    <Route path=":page" element={<Config />} />
                </Route>
                <Route path='/auth/signin' element={<SignIn />} />
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </>
    )
}

export default App
