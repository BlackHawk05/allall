import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import Analytics from './pages/Dashboard/Analytics'
import { Suppliers } from './pages/Suppliers'


const App = () => {
    const [loading, setLoading] = useState(true)

    const preloader = document.getElementById('preloader')

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none'
            setLoading(false)
        }, 2000)
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])

    return (
        !loading &&
        <>
            <Routes>
                <Route exact path='/' element={<Analytics />} />
                <Route path='/suppliers' element={<Suppliers />} />
                <Route path='/auth/signin' element={<SignIn />} />
                <Route path='/auth/signup' element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App
