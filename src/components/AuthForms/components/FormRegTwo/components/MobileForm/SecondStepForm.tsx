import React, { useRef } from 'react';
import { ISignInValues } from '~/components/AuthForms/interfaces';
import { RegistrationSchema } from '~/components/AuthForms/validation';
import { TextField } from '~/shared/ui/TextField';
import { LabelIcon } from '../LabelIcon';
import { useForm } from 'react-hook-form';
import { SelectField } from '~/shared/ui/SelectField';
import { mocks } from '~/components/AuthForms/mocks';
import { Button } from '~/shared/ui/Button';
import * as Icon from '~/images/icon'
import { useStore } from 'effector-react';
import { RegStore } from '~/store';
import { DatePicker } from '~/shared/ui/DatePicker';
import { CheckboxField } from '~/shared/ui/CheckboxField';

interface IProps {
    setStep: any;
}

export const SecondStepForm: React.FC<IProps> = ({ setStep }) => {
    const formValues = useStore(RegStore.$regValues);

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
        setStep('third');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-5 pt-12 border-b border-stroke'>
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
                <div className='mb-4'>
                    <DatePicker
                        name='birthdate'
                        label='Дата рождения'
                        classnames='w-full'
                        control={control}
                        errors={errors}
                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                    />
                </div>
                <div className='mb-4'>
                    <SelectField
                        label='Гражданство'
                        classnames='w-full'
                        values={mocks.citizenship}
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
                <div className='mb-4'>
                    <TextField
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
                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                    />
                </div>
                <div className='mb-4'>
                    <TextField
                        label='ФИО руководителя'
                        name='lastName'
                        placeholder='Фамилия'
                        classnames='w-full'
                        control={control}
                        rules={RegistrationSchema.lastName}
                        errors={errors}
                        defaultValue={formValues.lastName}
                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                    />
                </div>
                <div className='mb-4'>
                    <TextField
                        name='firstName'
                        placeholder='Имя'
                        classnames='w-full'
                        control={control}
                        rules={RegistrationSchema.firstName}
                        errors={errors}
                        defaultValue={formValues.firstName}
                    />
                </div>
                <div className='mb-4'>
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