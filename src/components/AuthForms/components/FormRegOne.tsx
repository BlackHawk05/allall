import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { ISignInValues } from '../interfaces';
import * as Icons from '~/images/icon'

import { Button } from '../../../shared/ui/Button';
import { JuridicalApi } from '~/services/juridical';
import { TextField } from '~/shared/ui/TextField';
import { RegistrationSchema } from '../validation';
import { useConfig } from '~/hooks/useConfig';
import * as Icon from '~/images/icon';
import { Tooltip } from '~/shared/ui/Tooltip';
import { useStore } from 'effector-react';
import { RegStore } from '~/store';

export const FormRegOne: React.FC = () => {
    const formValues = useStore(RegStore.$regValues);

    const { handleSubmit, control, formState: { errors } } = useForm<ISignInValues>({
        defaultValues: formValues
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isError, setIsError ] = useState<string | null>(null);
    const { isMobile } = useConfig();

    const onSubmit = async (data: ISignInValues) => {
        
        await JuridicalApi.getByInn({
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

                RegStore.saveRegData({
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
    
    const classes = {
        block: classNames([
            'relative',
            isMobile ? 'p-5 pt-12' : 'p-12 sm:p-17.5'
        ]),
        wrapper: classNames([
            'relative rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark',
            isMobile && 'mt-10 basis-full'
        ]),
        error: classNames([
            'mb-5 block font-medium',
            isError && 'text-red',
        ])
    }

    const handleBack = () => {
        RegStore.saveRegData({
            ...formValues,
            code: null
        });
    }

    const onBackButtonEvent = (e: any) => {
        e.preventDefault();
        handleBack();
    }

    useEffect(() => {
        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);  
        };
    }, []);
    console.log('errors:', errors);
    
    
    return (
        <div className={classes.wrapper}>
            <div className='absolute p-5 cursor-pointer top-0 left-0'>
                <Icons.arrow onClick={handleBack}/>
            </div>
            <div className={classes.block} style={{ width: isMobile ? 'auto' : '568px' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-center mb-5'>
                        <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                            Регистрация
                        </h2>
                        <span className={classes.error}>
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
                            labelIcon={
                                <Tooltip
                                    title='Подсказка'
                                    message='Сюда нужно ввести ФИО.'
                                    arrow='bottom-left'
                                    classname='w-90 -left-5 -top-25'
                                >
                                    <Icon.question className='[&>*]:hover:fill-primary' />
                                </Tooltip>
                            }
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
                            labelIcon={
                                <Tooltip
                                    title='Подсказка'
                                    message='Сюда нужно ввести E-mail.'
                                    arrow='bottom-left'
                                    classname='w-90 -left-5 -top-25'
                                >
                                    <Icon.question className='[&>*]:hover:fill-primary' />
                                </Tooltip>
                            }
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
                            labelIcon={
                                <Tooltip
                                    title='Подсказка'
                                    message='Сюда нужно ввести ИНН.'
                                    arrow='bottom-left'
                                    classname='w-90 -left-5 -top-25'
                                >
                                    <Icon.question className='[&>*]:hover:fill-primary' />
                                </Tooltip>
                            }
                        />
                    </div>
                    <div className='mb-4'>
                        <TextField
                            name='siteUrl'
                            label='Адрес сайта'
                            placeholder='https://example.com'
                            control={control}
                            defaultValue={formValues.siteUrl}
                            errors={errors}
                            rules={RegistrationSchema.siteUrl}
                            labelIcon={
                                <Tooltip
                                    title='Подсказка'
                                    message='Адрес вашего сайта. Например страница ВКонтакте.'
                                    arrow='bottom-left'
                                    classname='w-90 -left-5 -top-31'
                                >
                                    <Icon.question className='[&>*]:hover:fill-primary' />
                                </Tooltip>
                            }
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