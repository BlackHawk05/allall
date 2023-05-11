import React, { useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { ISignUpValues } from '../interfaces';
import { fetch } from '~/utils/fetch';

interface IProps {
    formValues: ISignUpValues;
    setIsComplite: (value: string) => void;
}

export const FormStepTwo: React.FC<IProps> = ({ formValues, setIsComplite }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    const onSubmit = async (data: ISignUpValues) => {
        const payload = {
            ...formValues,
            ...data
        }
        setIsLoading(true);

        const response = await fetch({
            method: 'get',
            url: '/auth/signin',
            params: payload
        });
        console.log('response:', response);

        if (response?.err) {
            setIsLoading(false);
        } else {
            setIsComplite(payload.email);
        }
    }


    const classButton = classNames([
        'w-full rounded-lg border border-primary bg-primary p-4 text-white transition',
        Object.keys(errors).length || isLoading ? 'opacity-50' : 'hover:bg-opacity-90',
    ]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <label className='mb-2.5 block font-medium text-black dark:text-white'>
                    Название организации
                </label>
                <div className='relative'>
                    <input
                        {...register('organization', {required: true, maxLength: 100})}
                        type='text'
                        placeholder='ООО “Название”'
                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    />

                    <span className='absolute right-4 top-4'>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path style={{ opacity: '0.5' }} d="M19.3876 21.4156H14.8845C13.7845 21.4156 12.8563 20.5219 12.8563 19.3875V15.7437C12.8563 15.4688 12.6501 15.2625 12.3751 15.2625H9.6251C9.3501 15.2625 9.14385 15.4688 9.14385 15.7437V19.3875C9.14385 20.5219 8.2501 21.4156 7.11572 21.4156H2.6126C1.5126 21.4156 0.584473 20.5219 0.584473 19.3875V7.80313C0.584473 7.21875 0.859473 6.70312 1.34072 6.39375L10.1063 0.859375C10.6563 0.515625 11.3438 0.515625 11.8595 0.859375L20.6251 6.42813C21.1063 6.7375 21.3813 7.25312 21.3813 7.8375V19.3875C21.4157 20.4875 20.4876 21.4156 19.3876 21.4156ZM9.6251 13.7156H12.3751C13.5095 13.7156 14.4032 14.6094 14.4032 15.7437V19.3875C14.4032 19.6625 14.6095 19.8687 14.8845 19.8687H19.3876C19.6626 19.8687 19.8688 19.6625 19.8688 19.3875V7.80313C19.8688 7.76875 19.8345 7.73438 19.8345 7.7L11.0345 2.16563C11.0001 2.13125 10.9657 2.13125 10.9313 2.16563L2.2001 7.7C2.16572 7.73438 2.13135 7.76875 2.13135 7.80313V19.3875C2.13135 19.6625 2.3376 19.8687 2.6126 19.8687H7.11572C7.39072 19.8687 7.59697 19.6625 7.59697 19.3875V15.7437C7.59697 14.6438 8.49072 13.7156 9.6251 13.7156Z" fill="#625B71"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className='mb-4'>
                <label className='mb-2.5 block font-medium text-black dark:text-white'>
                    ИНН
                </label>
                <div className='relative'>
                    <input
                        {...register('inn', {required: true, maxLength: 12, minLength: 10})}
                        type='number'
                        placeholder='7743013902'
                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    />

                    <span className='absolute right-4 top-4'>
                        <svg style={{ opacity: '0.5' }} width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.2499 3.74377H11.7905V1.57815C11.7905 1.16565 11.4468 0.821899 10.9999 0.821899C10.553 0.821899 10.2437 1.16565 10.2437 1.57815V3.74377H2.7499C1.58115 3.74377 0.618652 4.70627 0.618652 5.87502V17.0469C0.618652 18.2157 1.58115 19.1782 2.7499 19.1782H19.2499C20.4187 19.1782 21.3812 18.2157 21.3812 17.0469V5.87502C21.4155 4.70627 20.4187 3.74377 19.2499 3.74377ZM19.8687 17.0469C19.8687 17.3907 19.5937 17.6657 19.2499 17.6657H2.7499C2.40615 17.6657 2.13115 17.3907 2.13115 17.0469V5.87502C2.13115 5.53127 2.40615 5.25628 2.7499 5.25628H19.2499C19.5937 5.25628 19.8687 5.53127 19.8687 5.87502V17.0469Z" fill="#625B71"/>
                            <path d="M6.97793 11.3406C8.35293 11.3406 9.45293 10.2406 9.45293 8.86563C9.45293 7.49063 8.35293 6.39062 6.97793 6.39062C5.60293 6.39062 4.50293 7.49063 4.50293 8.86563C4.50293 10.2406 5.60293 11.3406 6.97793 11.3406ZM6.97793 7.9375C7.49355 7.9375 7.90605 8.35 7.90605 8.86563C7.90605 9.38125 7.49355 9.79375 6.97793 9.79375C6.4623 9.79375 6.0498 9.38125 6.0498 8.86563C6.0498 8.35 6.4623 7.9375 6.97793 7.9375Z" fill="#625B71"/>
                            <path d="M6.97783 12.0969C5.29346 12.0969 3.91846 13.4719 3.91846 15.1563C3.91846 15.5688 4.26221 15.9125 4.67471 15.9125C5.08721 15.9125 5.43096 15.5688 5.43096 15.1563C5.43096 14.3313 6.11846 13.6438 6.94346 13.6438C7.76846 13.6438 8.45596 14.3313 8.45596 15.1563C8.45596 15.5688 8.79971 15.9125 9.21221 15.9125C9.62471 15.9125 9.96846 15.5688 9.96846 15.1563C10.0372 13.4719 8.66221 12.0969 6.97783 12.0969Z" fill="#625B71"/>
                            <path d="M16.7407 7.59375H12.5126C12.1001 7.59375 11.7563 7.9375 11.7563 8.35C11.7563 8.7625 12.1001 9.10625 12.5126 9.10625H16.7407C17.1532 9.10625 17.497 8.7625 17.497 8.35C17.497 7.9375 17.1532 7.59375 16.7407 7.59375Z" fill="#625B71"/>
                            <path d="M16.7407 10.6188H12.5126C12.1001 10.6188 11.7563 10.9625 11.7563 11.375C11.7563 11.7875 12.1001 12.1313 12.5126 12.1313H16.7407C17.1532 12.1313 17.497 11.7875 17.497 11.375C17.497 10.9625 17.1532 10.6188 16.7407 10.6188Z" fill="#625B71"/>
                            <path d="M15.2282 14.2281H12.5126C12.1001 14.2281 11.7563 14.5719 11.7563 14.9844C11.7563 15.3969 12.1001 15.7407 12.5126 15.7407H15.2282C15.6407 15.7407 15.9845 15.3969 15.9845 14.9844C15.9845 14.5719 15.6751 14.2281 15.2282 14.2281Z" fill="#625B71"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className='mb-5'>
                <button
                    className={classButton}
                    disabled={Boolean(Object.keys(errors).length)}
                >
                    Зарегистрироваться
                </button>
            </div>
        </form>
   )
}