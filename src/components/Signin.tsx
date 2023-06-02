import React from 'react'
import { Link } from "react-router-dom"
import { ReactComponent as IconEnter } from '~/images/icon/icon-enter.svg'

export const SignIn: React.FC = () => {

    return (
        <Link to='/auth/signin'
            className='flex items-center gap-1'
        >
            <IconEnter />
            Войти
        </Link>
    )
}
