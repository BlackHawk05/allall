import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DefaultLayout from '~/layout/DefaultLayout';
import Breadcrumb from '~/components/Breadcrumb';
import { AuthLogo } from '../components/AuthLogo';
import { FormStepOne } from './components/FormStepOne';
import { ISignUpValues } from './interfaces';
import { FormStepTwo } from './components/FormStepTwo';
import { ReactComponent as CompliteLogo } from '~/images/icon/reg-complite.svg'

const SignUp: React.FC = () => {
    const [ formValues, setFormValues ] = useState<ISignUpValues>(null);
    const [ isComplite, setIsComplite ] = useState<string>(null);

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Регистрация' />

            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div className='flex flex-wrap items-center'>
                    <AuthLogo/>

                    <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
                        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
                            {isComplite
                                ? <div className='flex flex-col items-center text-center gap-2'>
                                    <CompliteLogo />
                                    <h2 className='mt-9 text-xl font-bold text-black dark:text-white'>
                                        Пожалуйста, подождите
                                    </h2>
                                    <span className='block font-medium'>
                                        Мы сообщим Вам на <span className='text-primary'>{isComplite}</span> когда все данные учетной записи будут проверены.
                                    </span>
                                </div>
                                : <>
                                    <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                                        Регистрация
                                    </h2>

                                    {!formValues
                                        ? <FormStepOne setFormValues={setFormValues} />
                                        : <FormStepTwo formValues={formValues} setIsComplite={setIsComplite}/>
                                    }
                                    
                                    <div className='mt-6 text-center'>
                                        <p>
                                            Уже есть аккаунт?{' '}
                                            <Link to='/auth/signin' className='text-primary'>
                                                Авторизация
                                            </Link>
                                        </p>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default SignUp;
