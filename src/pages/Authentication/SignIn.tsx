import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useForm } from 'react-hook-form';

import DefaultLayout from '~/layout/DefaultLayout';
import Breadcrumb from '~/components/Breadcrumb';
import { AuthLogo } from './components/AuthLogo';

const SignIn: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        console.log('data1:', data);
    }
    console.log('errors2:', errors);

    const classButton = classNames([
        'w-full rounded-lg border p-4 transition border-primary bg-primary text-white',
        Object.keys(errors).length ? 'opacity-50' : 'hover:bg-opacity-90',
    ]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Авторизация' />
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div className='flex flex-wrap items-center'>
                    <AuthLogo/>
                    <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
                        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
                            <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                                Авторизация
                            </h2>
                            <span className='mb-5 block font-medium'>
                                Введите номер телефона, на который мы отправим SMS с кодом подтверждения.
                            </span>

                            <form>
                                <div className='mb-4'>
                                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                                        Телефон
                                    </label>
                                    <div className='relative flex items-center rounded-lg border border-stroke pr-4'>
                                        <input
                                            type='tel'
                                            placeholder='+7'
                                            className='flex-grow rounded-lg pl-6 py-4 bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />

                                        <span className=''>
                                            <svg className='fill-current' width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path style={{opacity: '0.5'}} d='M16.7062 19.9347C13.9218 19.9347 9.96872 17.9409 6.32497 14.5034C1.37497 9.7597 -0.721905 4.46595 1.4781 2.12845C1.58122 2.02532 1.71872 1.9222 1.85622 1.85345L4.6406 0.272195C5.36247 -0.140305 6.25622 0.0659453 6.73747 0.753445L8.7656 3.64095C9.00622 3.9847 9.10935 4.3972 9.00622 4.8097C8.93747 5.18782 8.69685 5.53157 8.3531 5.7722L7.14997 6.56282C8.07809 7.90345 10.5875 11.2378 14.575 13.6097C14.6093 13.6441 14.6437 13.6097 14.6437 13.6097L15.5031 12.4409C15.9843 11.7878 16.9125 11.6159 17.6343 12.0628L20.6593 13.9878C21.3812 14.4347 21.5875 15.3628 21.1406 16.0847L19.4906 18.7316C19.3875 18.8691 19.2843 19.0066 19.1812 19.1097C18.5625 19.6597 17.7031 19.9347 16.7062 19.9347ZM5.43122 1.61282C5.39685 1.61282 5.43122 1.61282 5.43122 1.61282L2.61247 3.19407C1.30622 4.60345 2.92185 9.10657 7.42497 13.3691C11.9968 17.7003 16.7062 19.2472 18.2187 17.9409L19.8687 15.2941L16.8437 13.3691C16.8093 13.3691 16.775 13.3691 16.775 13.3691L15.9156 14.5378C15.4343 15.1909 14.5062 15.3628 13.8187 14.9503C9.52184 12.3722 6.8406 8.7972 5.8781 7.38782C5.63747 7.04407 5.56872 6.63157 5.63747 6.25345C5.70622 5.84095 5.94685 5.4972 6.2906 5.29095L7.49372 4.50032L5.49997 1.6472C5.4656 1.6472 5.43122 1.61282 5.43122 1.61282Z' fill='#625B71' />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className='mb-5'>
                                    <button
                                        className={classButton}
                                        disabled={Boolean(Object.keys(errors).length)}
                                    >
                                        Отправить код
                                    </button>
                                </div>

                                <div className='mt-6 text-center'>
                                    <p>
                                        Еще нет аккаунта?{' '}
                                        <Link to='/auth/signup' className='text-primary'>
                                            Регистрация
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default SignIn;
