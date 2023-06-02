import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ISignInValues } from '../interfaces';
import { ReactComponent as IconArrow } from '~/images/icon/icon-arrow.svg'
import { Button } from '../../../shared/ui/Button';
import { SelectField } from '~/shared/ui/SelectField';
import { DatePicker } from '~/shared/ui/DatePicker';
import { getByBic } from '~/services/juridical';
import { TextField } from '~/shared/ui/TextField';
import { RegistrationSchema } from '../validation';
import { registerUser } from '~/services/user';
import { mocks } from '../mocks'
import { payloadData } from '../helpers'
import { IRegistration } from '~/services/user/interfaces';
import { CheckboxField } from '~/shared/ui/CheckboxField';

interface IProps {
    formValues: ISignInValues;
    setIsComplite: (value: IRegistration['res']) => void;
    setFormValues: (data: ISignInValues) => void;
}

export const FormRegTwo: React.FC<IProps> = ({ formValues, setIsComplite, setFormValues }) => {
    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm<ISignInValues>({
        defaultValues: formValues,
        mode: 'onChange'
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isError, setIsError ] = useState<string | null>(null);

    let bankSearchTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);;

    const refs = {
        smz: useRef(null),
        citizenship: useRef(null),
        city: useRef(null),
        countryIso: useRef(null),
        addressType: useRef(null),
    }
    
    const onSubmit: SubmitHandler<ISignInValues> = async (data) => {

        setIsLoading(true);

        await registerUser({
            payload: payloadData({
                ...formValues,
                ...data
            })
        })
        .then((response) => {
            setIsComplite({
                ...response
            })
        })
        .catch((err: Error) => {
            setIsError(err.message);
        });
    }    

    const classBlock = classNames([
        'relative',
    ]);

    const handleBack = () => {
        setFormValues({
            ...formValues,
            inn: null
        });
    }    

    const bankSearch = async (bic: string) => {
        clearTimeout(bankSearchTimeout);

        if (bic.length < 9) {
            return;
        }

        bankSearchTimeout = setTimeout(async () => {
            const response = await getByBic({ bic });            

            if (response.items.length > 0) {
                const { bank_name: bankName } = response.items[0];

                setFormValues({
                    ...formValues,
                    bankName
                });
                setValue('bankName', bankName);
            }
        }, 300);
    }
       
    return (
        <div className='m-5 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className={classBlock}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='relative flex border-b border-stroke items-center'>
                        <div className='p-5 cursor-pointer'>
                            <IconArrow onClick={handleBack}/>
                        </div>
                        <span>Регистрация</span>
                    </div>
                    <div className='p-5 border-b border-stroke'>
                        <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                            Личная информация
                        </h2>
                        <div className='flex gap-5'>

                            <div className='mb-4 w-1/3'>
                                <TextField
                                    name='fio'
                                    label='ФИО'
                                    placeholder='Иванов Иван Иванович'
                                    rules={RegistrationSchema.fio}
                                    defaultValue={formValues.fio}
                                    control={control}
                                    errors={errors}
                                />
                            </div>

                            <div className='mb-4 w-1/3'>
                                <TextField
                                    name='phoneString'
                                    label='Номер телефона'
                                    mask={'+7\ (999) 999-99-99'}
                                    placeholder='+7'
                                    rules={RegistrationSchema.phoneString}
                                    defaultValue={formValues.phoneString}
                                    control={control}
                                    errors={errors}
                                />
                            </div>
                            <div className='mb-4 w-1/3'>
                                <TextField
                                    name='email'
                                    label='Электронная почта'
                                    placeholder='example@email.com'
                                    control={control}
                                    defaultValue={formValues.email}
                                    rules={RegistrationSchema.email}
                                    errors={errors}
                                />
                            </div>
                            <div className='mb-4 w-1/3'>
                                <TextField
                                    name='siteUrl'
                                    label='Адрес сайта'
                                    placeholder='https://example.com'
                                    control={control}
                                    defaultValue={formValues.siteUrl}
                                    errors={errors}
                                    rules={RegistrationSchema.siteUrl}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex'>
                        <div className='p-5 w-1/2'>
                            <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 whitespace-nowrap'>
                                Юридическая информация
                            </h2>
                            <div className='mb-4'>
                                <TextField
                                    name='fullOrganizationName'
                                    label='Полное название организации'
                                    placeholder='Общество с Ограниченной Ответственностью “Название”'
                                    classnames='w-full'
                                    control={control}
                                    rules={RegistrationSchema.fullOrganizationName}
                                    errors={errors}
                                    defaultValue={formValues.fullOrganizationName}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextField
                                    name='shortOrganizationName'
                                    label='Сокращенное название'
                                    placeholder='ООО “Название”'
                                    classnames='w-full'
                                    control={control}
                                    rules={RegistrationSchema.shortOrganizationName}
                                    errors={errors}
                                    defaultValue={formValues.shortOrganizationName}
                                />
                            </div>
                            <div className='mb-4'>
                                {formValues.organizationForm === 'INDIVIDUAL'
                                    && <CheckboxField
                                        label='Самозанятый'
                                        ref={refs.smz}
                                        changeHandler={(value: boolean) => {
                                            setFormValues({
                                                ...formValues,
                                                smz: value
                                            })
                                        }}
                                    />
                                }
                            </div>
                            <div className='mb-4'>
                                <TextField
                                    label='ФИО руководителя'
                                    name='lastName'
                                    placeholder='Фамилия'
                                    classnames='w-full mb-5'
                                    control={control}
                                    rules={RegistrationSchema.lastName}
                                    errors={errors}
                                    defaultValue={formValues.lastName}
                                />
                                <TextField
                                    name='firstName'
                                    placeholder='Имя'
                                    classnames='w-full mb-5'
                                    control={control}
                                    rules={RegistrationSchema.firstName}
                                    errors={errors}
                                    defaultValue={formValues.firstName}
                                />
                                <TextField
                                    name='middleName'
                                    placeholder='Отчество'
                                    classnames='w-full'
                                    control={control}
                                    rules={RegistrationSchema.middleName}
                                    errors={errors}
                                    defaultValue={formValues.middleName}
                                />
                            </div>
                            <div className='mb-4 flex gap-5 w-full'>
                                <DatePicker
                                    name='birthdate'
                                    label='Дата рождения'
                                    classnames='w-1/2'
                                    control={control}
                                    errors={errors}
                                />
                                <SelectField
                                    label='Гражданство'
                                    classnames='w-1/2'
                                    values={mocks.citizenship}
                                    ref={refs.citizenship}
                                    {...register('citizenship', RegistrationSchema.citizenship)}
                                />
                            </div>
                            <div className='mb-4 flex gap-5 w-full'>
                                <TextField
                                    type='number'
                                    name='ogrn'
                                    label='ОГРН'
                                    placeholder='ОГРН'
                                    classnames='w-1/2'
                                    control={control}
                                    rules={RegistrationSchema.ogrn}
                                    errors={errors}
                                    defaultValue={formValues.ogrn}
                                />
                                <TextField
                                    type='number'
                                    name='inn'
                                    label='ИНН'
                                    placeholder='ИНН'
                                    classnames='w-1/2'
                                    control={control}
                                    rules={RegistrationSchema.inn}
                                    errors={errors}
                                    defaultValue={formValues.inn}
                                    disabled
                                />
                            </div>
                            <div className='mb-4'>
                                {formValues.organizationForm !== 'INDIVIDUAL'
                                    && <TextField
                                        type='number'
                                        name='kpp'
                                        label='КПП'
                                        placeholder='000000'
                                        classnames='w-full'
                                        control={control}
                                        rules={RegistrationSchema.kpp}
                                        errors={errors}
                                        defaultValue={formValues.inn.length !== 12 && formValues.kpp}
                                        disabled={formValues.inn.length === 12}
                                    />
                                }
                            </div>
                        </div>
                        <div className='p-5 w-1/2 border-stroke border-l flex flex-col'>
                            <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 whitespace-nowrap'>
                                Банковская информация
                            </h2>
                            <div className='mb-4 flex gap-5 w-full'>
                                <TextField
                                    type='number'
                                    name='bic'
                                    label='БИК'
                                    placeholder='044525411'
                                    rules={RegistrationSchema.bic}
                                    classnames='w-1/2'
                                    defaultValue={formValues.bic}
                                    control={control}
                                    errors={errors}
                                    changeHandler={bankSearch}
                                />
                                <TextField
                                    type='number'
                                    name='billNumber'
                                    label='Рассчетный счет'
                                    placeholder='30101810145250000411'
                                    classnames='w-1/2'
                                    control={control}
                                    errors={errors}
                                    rules={RegistrationSchema.billNumber}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextField
                                    name='bankName'
                                    label='Банк'
                                    placeholder='Название банка'
                                    classnames='w-full'
                                    control={control}
                                    rules={RegistrationSchema.bankName}
                                    defaultValue={formValues.bankName}
                                    errors={errors}
                                    disabled
                                />
                            </div>
                            <div className='mb-4 flex gap-5 w-full'>
                                <SelectField
                                    label='Тип адреса'
                                    classnames='w-1/2'
                                    values={mocks.addressType}
                                    ref={refs.addressType}
                                    {...register('addressType', RegistrationSchema.addressType)}
                                />
                                <TextField
                                    type='number'
                                    name='zipcode'
                                    label='Почтовый индекс'
                                    placeholder='000000'
                                    classnames='w-1/2'
                                    control={control}
                                    errors={errors}
                                    rules={RegistrationSchema.zipcode}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextField
                                    name='city'
                                    label='Город или населенный пункт'
                                    placeholder='Москва'
                                    classnames='w-full'
                                    ref={refs.city}
                                    control={control}
                                    errors={errors}
                                    rules={RegistrationSchema.city}
                                />
                            </div>
                            <div className='mb-4'>
                                <SelectField
                                    label='Код страны по ISO'
                                    classnames='w-full'
                                    values={mocks.countries}
                                    ref={refs.countryIso}
                                    {...register('countryIso', RegistrationSchema.countryIso)}
                                />
                            </div>
                            <div className='mb-4'>
                                <TextField
                                    name='address'
                                    label='Улица, дом, корпус, квартира, офис'
                                    placeholder='ул. Ленина, д. 52'
                                    classnames='w-full'
                                    control={control}
                                    errors={errors}
                                    rules={RegistrationSchema.address}
                                />
                            </div>
                            <div className='mb-4 flex items-end grow'>
                                <Button
                                    classnames='w-full'
                                    disabled={Boolean(Object.keys(errors).length) || isLoading}
                                >
                                    Зарегистрироваться
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
   )
}