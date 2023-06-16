import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '~/hooks/useConfig';
import LogoComplite from '~/images/logo/logo-reg-complite.svg'
import { AuthService } from '~/services/auth';

interface IProps {
    setIsComplite: any;
}

export const RegComplite: React.FC<IProps> = ({ setIsComplite }) => {
    const navigate = useNavigate();
    const { isMobile } = useConfig();

    useEffect(() => {
        setTimeout(async () => {
            const check = await AuthService.checkAuth();
            navigate('/');
        }, 4000);
    });

    const classes = {
        container: classNames([
            'flex flex-col gap-5 items-center justify-center',
            'rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark',
            'text-center py-10',
            isMobile ? 'px-5' : 'm-5 px-10 basis-3/4'
        ])
    }

    return (
        <div className={classes.container}>
            <img className='dark:hidden' src={LogoComplite} alt='Logo' />
            <h1 className='text-2xl font-bold'>Пожалуйста, подождите</h1>
            <span>Личный кабинет формируется.</span>
        </div>
    )
}