import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ISignInValues } from '~/components/AuthForms/interfaces';
import { ReactComponent as IconArrow } from '~/images/icon/icon-arrow.svg'
import { Button } from '~/shared/ui/Button';
import { SelectField } from '~/shared/ui/SelectField';
import { DatePicker } from '~/shared/ui/DatePicker';
import { JuridicalService } from '~/services/juridical';
import { TextField } from '~/shared/ui/TextField';
import { RegistrationSchema } from '~/components/AuthForms/validation';
import { CheckboxField } from '~/shared/ui/CheckboxField';
import { AuthService } from '~/services/auth';
import { useStore } from 'effector-react';
import { RegStore } from '~/store';
import { LabelIcon } from '~/shared/ui/LabelIcon';
import { $config } from '~/services/config';

interface IProps {
    setIsComplite: any;
}

export const DesktopForm: React.FC<IProps> = ({ setIsComplite }) => {
    const formValues = useStore(RegStore.$regValues);
    const config = useStore($config);

    const { register, control, setValue, handleSubmit, formState: { errors }, clearErrors } = useForm<ISignInValues>({
        defaultValues: formValues,
        mode: 'onChange'
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const refs = {
        smz: useRef(null),
        citizenship: useRef(null),
        city: useRef(null),
        countryIso: useRef(null),
        addressType: useRef(null),
    }
    
    const onSubmit: SubmitHandler<ISignInValues> = async (data) => {

        setIsLoading(true);

        await AuthService.registration({
            formValues,
            data,
            setIsComplite,
        });

        setIsLoading(false);
    }    

    const classBlock = classNames([
        'relative',
    ]);

    const handleBack = () => {
        RegStore.saveRegData({
            ...formValues,
            inn: null
        });
    }
    
    return (
        <div className='m-5 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className={classBlock}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='relative flex border-b border-stroke items-center'>
                        <div className='p-5 cursor-pointer'>
                            <IconArrow onClick={handleBack}/>
                        </div>
                        <span className='text-black'>Регистрация</span>
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
                                    labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
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
                                    labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
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
                                    labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
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
                                    labelIcon={<LabelIcon title='Подсказка' message={'Адрес вашего сайта. Например страница ВКонтакте.'} />}
                                />
                            </div>
                        </div>
                    </div>


                    <div className='p-5 border-b border-stroke'>
                        <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 whitespace-nowrap'>
                            Юридическая информация
                        </h2>

                        <div className='flex'>
                            <div className='pr-5 basis-1/2'>
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
                                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
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
                                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <TextField
                                        type='number'
                                        name='inn'
                                        label='ИНН'
                                        placeholder='ИНН'
                                        classnames='w-full'
                                        control={control}
                                        rules={RegistrationSchema.inn}
                                        errors={errors}
                                        defaultValue={formValues.inn}
                                        disabled
                                    />
                                </div>
                                {formValues.organizationForm === 'INDIVIDUAL'
                                    && <div className='mb-4'>
                                        <CheckboxField
                                            label='Самозанятый'
                                            ref={refs.smz}
                                            changeHandler={(value: boolean) => {
                                                RegStore.saveRegData({
                                                    ...formValues,
                                                    smz: value
                                                })
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                            <div className='basis-1/2'>
                                <div className='mb-4 flex gap-5'>
                                    <DatePicker
                                        name='birthdate'
                                        label='Дата рождения'
                                        classnames='w-1/2'
                                        control={control}
                                        errors={errors}
                                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                    />
                                    <SelectField
                                        label='Гражданство'
                                        classnames='w-1/2'
                                        values={config.citizenship}
                                        ref={refs.citizenship}
                                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                        {...register('citizenship', RegistrationSchema.citizenship)}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <TextField
                                        type='number'
                                        name='ogrn'
                                        label='ОГРН'
                                        placeholder='ОГРН'
                                        classnames='w-full'
                                        control={control}
                                        rules={RegistrationSchema.ogrn}
                                        errors={errors}
                                        defaultValue={formValues.ogrn}
                                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                    />
                                    
                                </div>
                                {formValues.inn.length === 10
                                    && <div className='mb-4'>
                                        <TextField
                                            type='number'
                                            name='kpp'
                                            label='КПП'
                                            placeholder='000000'
                                            classnames='w-full'
                                            control={control}
                                            rules={RegistrationSchema.kpp}
                                            errors={errors}
                                            defaultValue={formValues.kpp}
                                            labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='mb-4 flex gap-5 items-end'>
                            <TextField
                                label='ФИО руководителя'
                                name='lastName'
                                placeholder='Фамилия'
                                classnames='w-1/3'
                                control={control}
                                rules={RegistrationSchema.lastName}
                                errors={errors}
                                defaultValue={formValues.lastName}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            <TextField
                                name='firstName'
                                placeholder='Имя'
                                classnames='w-1/3'
                                control={control}
                                rules={RegistrationSchema.firstName}
                                errors={errors}
                                defaultValue={formValues.firstName}
                            />
                            <TextField
                                name='middleName'
                                placeholder='Отчество'
                                classnames='w-1/3'
                                control={control}
                                rules={RegistrationSchema.middleName}
                                errors={errors}
                                defaultValue={formValues.middleName}
                            />
                        </div>
                    </div>

                    <div className='p-5 border-b border-stroke'>
                        <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 whitespace-nowrap'>
                            Адрес
                        </h2>

                        <div className='mb-4 flex gap-5 w-full'>
                            <TextField
                                type='number'
                                name='zipcode'
                                label='Почтовый индекс'
                                placeholder='000000'
                                classnames='basis-1/2'
                                control={control}
                                errors={errors}
                                rules={RegistrationSchema.zipcode}
                                changeHandler={(value: string) => JuridicalService.addressSearch({
                                    zip: value,
                                    clearErrors,
                                    setValue,
                                    formValues
                                })}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            <SelectField
                                label='Тип адреса'
                                classnames='basis-1/2'
                                values={config.addressType}
                                ref={refs.addressType}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                {...register('addressType', RegistrationSchema.addressType)}
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
                                defaultValue={formValues.city}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                        </div>
                        <div className='mb-4 flex gap-5 w-full'>
                            <SelectField
                                label='Код страны по ISO'
                                classnames='basis-1/2'
                                values={config.countries}
                                ref={refs.countryIso}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                {...register('countryIso', RegistrationSchema.countryIso)}
                            />
                            <TextField
                                name='address'
                                label='Улица, дом, корпус, квартира, офис'
                                placeholder='ул. Ленина, д. 52'
                                classnames='basis-1/2'
                                control={control}
                                errors={errors}
                                rules={RegistrationSchema.address}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                        </div>
                    </div>

                    <div className='p-5 flex flex-col'>
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
                                classnames='basis-1/2'
                                defaultValue={formValues.bic}
                                control={control}
                                errors={errors}
                                changeHandler={(value: string) => JuridicalService.bankSearch({
                                    bic: value,
                                    clearErrors,
                                    setValue,
                                    formValues
                                })}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            <TextField
                                type='number'
                                name='billNumber'
                                label='Рассчетный счет'
                                placeholder='30101810145250000411'
                                classnames='basis-1/2'
                                control={control}
                                errors={errors}
                                rules={RegistrationSchema.billNumber}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                        </div>
                        <div className=''>
                            <TextField
                                name='bankName'
                                label='Банк'
                                placeholder='Название банка'
                                classnames='w-full'
                                control={control}
                                rules={RegistrationSchema.bankName}
                                defaultValue={formValues.bankName}
                                errors={errors}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                        </div>
                    </div>

                    <div className='p-5 mb-4 flex justify-end'>
                        <Button
                            classnames='basis-1/2'
                            disabled={Boolean(Object.keys(errors).length) || isLoading}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
            </div>
        </div>
   )
}