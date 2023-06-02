import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IRegistration } from '~/services/user/interfaces';
import { setTokens } from '~/services/auth';
import { saveUserData } from '~/services/user';
import LogoComplite from '~/images/logo/logo-reg-complite.svg'

interface IProps {
    isComplite: IRegistration['res']
}

export const RegComplite: React.FC<IProps> = (props) => {
    const { isComplite } = props;
    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            isComplite?.tokens && setTokens(isComplite.tokens);
            isComplite?.me && saveUserData(isComplite.me);
            navigate('/');
        }, 4000);
    })

    return (
        <div className='h-full w-full p-5 flex justify-center items-center h-screen'>
            <div className='py-10 md:px-26 xl:px-50 flex flex-col items-center justify-center gap-7 text-center
                rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'
            >
                <img className='dark:hidden' src={LogoComplite} alt='Logo' />
                <h1 className='text-2xl font-bold'>Пожалуйста, подождите</h1>
                <span>Личный кабинет формируется.</span>
            </div>
        </div>
    )
}