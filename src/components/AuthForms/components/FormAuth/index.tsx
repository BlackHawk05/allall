import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { phoneClear } from '~/helpers/phone';
import { ISingnInPhone, ISignInValues } from '../../interfaces';
import styles from './styles.module.scss'
import { ReactComponent as IconPhone } from '~/images/icon/icon-phone.svg'
import { Button } from '~/shared/ui/Button';
import { clearTokens, codeSend } from '~/services/auth';
import { SmsTimeCounter } from '../SmsTimeCounter';
import { TextField } from '~/shared/ui/TextField';
import { RegistrationSchema } from '../../validation';

interface IProps {
    setFormValues: (data: ISignInValues) => void;
    formValues: ISignInValues;
}

export const FormAuth: React.FC<IProps> = ({ setFormValues, formValues }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isError, setIsError ] = useState<any>(null);
    const [ isSendCodeAvailable, setIsSendCodeAvailable ] = useState<boolean>(true);

    const phoneRef = useRef(null);

    const classes = {
        block: classNames([
            'p-4 sm:p-12.5 xl:p-17.5',
            styles.block
        ]),
        error: classNames([
            'mb-5 block font-medium text-center',
            (errors.phoneString || isError) && 'text-red'
        ])
    }

    const onSubmit = async (data: ISingnInPhone) => {

        clearTokens();
        data.phone = phoneClear(data.phoneString);

        setIsLoading(true);
        setIsError(null);

        await codeSend({
            phone: data.phone
        })
        .then((response) => {
            if (response.used_attempts_code_sending === 0) {
                const renderError = () => {
                    return (
                        <>
                            Вы можете повторно запросить код&nbsp;
                            <span className='text-primary'>
                                через {
                                    <SmsTimeCounter 
                                        countLimit={response.time_until_next_code_send || 1} 
                                        setIsSendCodeAvailable={setIsSendCodeAvailable}
                                        setIsError={setIsError}
                                    />
                                }с.
                            </span>
                        </>
                    )
                }
                setIsSendCodeAvailable(false);
                setIsError(renderError());
            } else {
                setFormValues({
                    ...formValues,
                    ...data
                })
            }
        })
        .catch((err: Error) => {
            setIsError(err.message);
        });

        setIsLoading(false);
    }

    return (
        <div className='m-5 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className={classes.block}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center'>
                        Авторизация
                    </h2>
                    <span className={classes.error}>
                        {errors.phoneString || isError
                            ? isError || <>Пожалуйста, корректно введите номер<br/>Вашего телефона.</>
                            : 'Введите номер телефона, на который мы отправим SMS с кодом подтверждения.'
                        }
                    </span>
                    <div className='mb-4'>
                        <TextField
                            name='phoneString'
                            label='Телефон'
                            mask={'+7\ (999) 999-99-99'}
                            placeholder='+7'
                            iconEnd={<IconPhone />}
                            classnames='w-full'
                            changeHandler={() => setIsError(null)}
                            rules={RegistrationSchema.phoneString}
                            defaultValue={formValues.phoneString}
                            control={control}
                            errors={errors}
                        />
                    </div>
                    <div>
                        <Button 
                            classnames='w-full' 
                            disabled={Boolean(Object.keys(errors).length) || isLoading || !isSendCodeAvailable}
                        >
                            Отправить код
                        </Button>
                    </div>
                </form>
            </div>
        </div>
   )
}