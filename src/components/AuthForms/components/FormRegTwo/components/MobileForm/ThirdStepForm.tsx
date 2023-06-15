import React, { useRef, useState } from 'react';
import { ISignInValues } from '~/components/AuthForms/interfaces';
import { RegistrationSchema } from '~/components/AuthForms/validation';
import { TextField } from '~/shared/ui/TextField';
import { LabelIcon } from '../LabelIcon';
import { useForm } from 'react-hook-form';
import { Button } from '~/shared/ui/Button';
import * as Icon from '~/images/icon'
import { useStore } from 'effector-react';
import { RegStore } from '~/store';
import { JuridicalService } from '~/services/juridical';
import { AuthService } from '~/services/auth';

interface IProps {
    setIsComplite: any;
    setStep: any;
}

export const ThirdStepForm: React.FC<IProps> = ({ setIsComplite, setStep }) => {
    const formValues = useStore(RegStore.$regValues);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

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

    const onSubmit = async (data: ISignInValues) => {
        setIsLoading(true);

        await AuthService.registration({
            formValues,
            data,
            setIsComplite,
        });

        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-5 pt-12 flex flex-col'>
                <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 whitespace-nowrap'>
                    Банковская информация
                </h2>
                <div className='mb-4'>
                    <TextField
                        type='number'
                        name='bic'
                        label='БИК'
                        placeholder='044525411'
                        rules={RegistrationSchema.bic}
                        classnames='w-full'
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
                </div>
                <div className='mb-4'>
                    <TextField
                        type='number'
                        name='billNumber'
                        label='Рассчетный счет'
                        placeholder='30101810145250000411'
                        classnames='w-full'
                        control={control}
                        errors={errors}
                        rules={RegistrationSchema.billNumber}
                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
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
                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                    />
                </div>
            </div>
            <div className='px-5 mb-4'>
                <Button
                    classnames='w-full'
                    disabled={Boolean(Object.keys(errors).length) || isLoading}
                >
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    )
}