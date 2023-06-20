import React, { useRef } from 'react';
import { ISignInValues } from '~/components/AuthForms/interfaces';
import { RegistrationSchema } from '~/components/AuthForms/validation';
import { TextField } from '~/shared/ui/TextField';
import { useForm } from 'react-hook-form';
import { SelectField } from '~/shared/ui/SelectField';
import { Button } from '~/shared/ui/Button';
import * as Icon from '~/images/icon'
import { useStore } from 'effector-react';
import { RegStore } from '~/store';
import { JuridicalService } from '~/services/juridical';
import { LabelIcon } from '~/shared/ui/LabelIcon';
import { $config } from '~/services/config';

interface IProps {
    setStep: any;
}

export const FirstStepForm: React.FC<IProps> = ({ setStep }) => {
    const formValues = useStore(RegStore.$regValues);
    const config = useStore($config);

    const { register, control, setValue, handleSubmit, formState: { errors }, clearErrors } = useForm<ISignInValues>({
        defaultValues: formValues,
        mode: 'onChange'
    });

    const refs = {
        smz: useRef(null),
        citizenship: useRef(null),
        city: useRef(null),
        countryIso: useRef(null),
        addressType: useRef(null),
    }

    const onSubmit = (data) => {
        RegStore.saveRegData({
            ...formValues,
            ...data
        })
        setStep('second');
    }

    const handleBack = () => {
        RegStore.saveRegData({
            ...formValues,
            inn: null
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-5 pt-12 border-b border-stroke'>
                <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                    Личная информация
                </h2>
                <div className='flex-col gap-5'>

                    <div className='mb-4'>
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

                    <div className='mb-4'>
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
                    <div className='mb-4'>
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
                    <div className='mb-4'>
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
            <div className='p-5'>
                <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 whitespace-nowrap'>
                    Адрес
                </h2>

                <div className='mb-4'>
                    <TextField
                        type='number'
                        name='zipcode'
                        label='Почтовый индекс'
                        placeholder='000000'
                        classnames=''
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
                </div>
                <div className='mb-4'>
                    <SelectField
                        label='Тип адреса'
                        classnames=''
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
                <div className='mb-4'>
                    <SelectField
                        label='Код страны по ISO'
                        classnames=''
                        values={config.countries}
                        ref={refs.countryIso}
                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                        {...register('countryIso', RegistrationSchema.countryIso)}
                    />
                </div>
                <div className='mb-4'>
                    <TextField
                        name='address'
                        label='Улица, дом, корпус, квартира, офис'
                        placeholder='ул. Ленина, д. 52'
                        classnames=''
                        control={control}
                        errors={errors}
                        rules={RegistrationSchema.address}
                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                    />
                </div>
            </div>
            <div className='px-5 mb-4'>
                <Button
                    classnames='w-full'
                    disabled={Boolean(Object.keys(errors).length)}
                    endIcon={<Icon.arrow className='[&>*]:fill-white rotate-180' />}
                >
                    Продолжить
                </Button>
            </div>
        </form>
    )
}