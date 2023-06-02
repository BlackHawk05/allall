import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { ISignInValues } from '../interfaces';
import * as Icons from '~/images/icon'

import { Button } from '../../../shared/ui/Button';
import { getByInn } from '~/services/juridical';
import { TextField } from '~/shared/ui/TextField';
import { RegistrationSchema } from '../validation';

interface IProps {
    setFormValues: (data: ISignInValues) => void;
    formValues: ISignInValues;
}

export const FormRegOne: React.FC<IProps> = ({ setFormValues, formValues }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ISignInValues>({
        defaultValues: formValues
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isError, setIsError ] = useState<string | null>(null);
    
    const onSubmit = async (data: ISignInValues) => {
        
        await getByInn({
            inn: data.inn
        })
        .then((response) => {
            
            if (!response?.items.length) {
                setIsError('Неверно указан ИНН');
            } else {
                const {
                    full_organization_name,
                    short_organization_name,
                    type,
                    ogrn,
                    kpp,
                    ceo,
                } = response?.items[0];

                setFormValues({
                    ...formValues,
                    ...data,
                    fullOrganizationName: full_organization_name,
                    shortOrganizationName: short_organization_name,
                    organizationForm: type,
                    firstName: ceo.first_name,
                    lastName: ceo.last_name,
                    middleName: ceo.middle_name,
                    ogrn,
                    kpp: type === 'INDIVIDUAL' ? '000000' : kpp,
                })
            }
        })
        .catch((err: Error) => {
            setIsError(err.message);
        });
    }

    const classBlock = classNames([
        'relative p-4 sm:p-12.5 xl:p-17.5',
    ]);

    const classButton = classNames([
        'w-full rounded-lg border border-primary bg-primary p-4 text-white transition',
        Object.keys(errors).length ? 'opacity-50' : 'hover:bg-opacity-90',
    ]);

    const handleBack = () => {
        setFormValues({
            ...formValues,
            code: null
        });
    }

    const classError = classNames([
        'mb-5 block font-medium',
        isError && 'text-red',
    ]);
    
    return (
        <div className='m-5 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className={classBlock} style={{ width: '568px' }}>
                <div className='absolute p-5 cursor-pointer top-0 left-0'>
                    <Icons.arrow onClick={handleBack}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-center mb-5'>
                        <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                            Регистрация
                        </h2>
                        <span className={classError}>
                            { isError || <>Заполните все данные</> }
                        </span>
                    </div>
                    <div className='mb-4'>
                        <TextField
                            name='fio'
                            label='ФИО'
                            placeholder='Иванов Иван Иванович'
                            iconEnd={<Icons.profile />}
                            classnames='w-full'
                            rules={RegistrationSchema.fio}
                            defaultValue={formValues.fio}
                            control={control}
                            errors={errors}
                        />
                    </div>
                    <div className='mb-4'>
                        <TextField
                            name='email'
                            label='Электронная почта'
                            placeholder='example@email.com'
                            iconEnd={<Icons.email />}
                            classnames='w-full'
                            control={control}
                            defaultValue={formValues.email}
                            rules={RegistrationSchema.email}
                            errors={errors}
                        />
                    </div>
                    <div className='mb-4'>
                        <TextField
                            name='inn'
                            type='number'
                            label='ИНН'
                            placeholder='7743013902'
                            iconEnd={<Icons.passport />}
                            classnames='w-full'
                            control={control}
                            rules={RegistrationSchema.inn}
                            errors={errors}
                            defaultValue={formValues.inn}
                        />
                    </div>
                    <Button
                        classnames='w-full' 
                        disabled={Boolean(Object.keys(errors).length) || isLoading}
                    >
                        Продолжить
                    </Button>
                </form>
            </div>
        </div>
   )
}