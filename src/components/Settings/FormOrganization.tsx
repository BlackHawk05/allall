import React from 'react';
import * as Icons from '~/images/icon'

interface IProps {
}

export const FormOrganization: React.FC<IProps> = (props) => {
   const {  } = props;

   return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
                <h3 className='font-bold text-black dark:text-white'>
                    Информация об организации
                </h3>
            </div>
            <div className='p-7'>
                <form action='#'>
                    <div className='mb-5.5'>
                        <label
                            className='mb-3 block text-sm font-bold text-black dark:text-white'
                            htmlFor='fullName'
                        >
                            Наименование
                        </label>
                        <div className='relative'>
                            <input
                                className='w-full rounded-lg border border-stroke py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                type='text'
                                name='fullName'
                                id='fullName'
                                placeholder='Devid Jhon'
                                defaultValue='Devid Jhon'
                            />
                            <span className='absolute right-4.5 top-4'>
                                <Icons.profile />
                            </span>
                        </div>
                    </div>

                    <div className='mb-5.5'>
                        <label
                            className='mb-3 block text-sm font-bold text-black dark:text-white'
                            htmlFor='phoneNumber'
                        >
                            ИНН
                        </label>
                        <div className='relative'>
                            <input
                                className='w-full rounded-lg border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                type='text'
                                name='phoneNumber'
                                id='phoneNumber'
                                placeholder='+990 3343 7865'
                                defaultValue='+990 3343 7865'
                            />
                            <span className='absolute right-4.5 top-4'>
                                <Icons.phone />
                            </span>
                        </div>
                    </div>

                    <div className='flex justify-end gap-4.5'>
                        <button
                            className='flex justify-center rounded border border-stroke py-2 px-6 font-bold text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                            type='submit'
                        >
                            Отмена
                        </button>
                        <button
                            className='flex justify-center rounded bg-primary py-2 px-6 font-bold text-gray hover:shadow-1'
                            type='submit'
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
   )
}