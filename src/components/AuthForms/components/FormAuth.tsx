import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { phoneClear } from '~/utils/helpers';
import { ISingnInPhone, ISignInValues } from '../interfaces';
import { ReactComponent as IconPhone } from '~/images/icon/icon-phone.svg'
import { Button } from '~/shared/ui/Button';
import { AuthApi, AuthService } from '~/services/auth';
import { SmsTimeCounter } from './SmsTimeCounter';
import { TextField } from '~/shared/ui/TextField';
import { RegistrationSchema } from '../validation';
import { useConfig } from '~/hooks/useConfig';
import { ReCaptcha } from '~/shared/ui/ReCaptcha';
import * as Icon from '~/images/icon';
import { Tooltip } from '~/shared/ui/Tooltip';
import { RegStore } from '~/store';
import { useStore } from 'effector-react';

export const FormAuth: React.FC = () => {
    const { register, control, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm<ISignInValues>();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isError, setIsError ] = useState<any>(null);
    const [ isSendCodeAvailable, setIsSendCodeAvailable ] = useState<boolean>(true);
    const [ showCaptcha, setShowCaptcha ] = useState<boolean>(false);
    const { isMobile } = useConfig();
    const formValues = useStore(RegStore.$regValues);

    useEffect(() => {
        if (showCaptcha) {
            register('recaptcha', { required: true });
        } else {
            register('recaptcha', { required: false });
        }
    }, [showCaptcha])

    const classes = {
        container: classNames([
            'rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark',
            isMobile ? 'mt-10 flex-grow' : 'm-5'
        ]),
        block: classNames([
            isMobile ? 'p-5 pt-12' : 'p-12 sm:p-17.5',
        ]),
        error: classNames([
            'mb-5 block font-medium text-center',
            (errors.phoneString || isError) && 'text-red'
        ])
    }

    const renderError = (response) => {
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

    const onSubmit = async (data: ISingnInPhone) => {

        AuthService.clearTokens();
        data.phone = phoneClear(data.phoneString);

        setIsLoading(true);
        setIsError(null);

        await AuthApi.checkPhone({
            phone: data.phone
        })
        .then(async () => {
            
            await AuthApi.authCodeSend({
                phone: data.phone
            })
            .then((response) => {
                checkCodeResponse({
                    response,
                    data,
                })
            })
            .catch((err: Error) => {
                setIsError(err.message);
            });
        })
        .catch(async (err: any) => {
            const { response } = err;

            if (response?.status === 422) {
                await AuthApi.regCodeSend({
                    phone: data.phone
                })
                .then((response) => {
                    checkCodeResponse({
                        response,
                        data,
                        isReg: true
                    })
                })
                .catch((err: any) => {
                    const { response } = err;

                    if (response?.status === 409) {
                        setShowCaptcha(true);
                    } else {
                        setIsError(err.message);
                    }
                });
            } else {
                setIsError(err.message);
            }
            
        });

        clearErrors();
        setIsLoading(false);
    }

    const checkCodeResponse = ({
        response,
        data,
        isReg = false
    }) => {
        if (response.used_attempts_code_sending === 0) {
            setIsSendCodeAvailable(false);
            setIsError(renderError(response));
        } else {
            RegStore.saveRegData({
                ...formValues,
                ...data,
                isReg,
            })
        }
    }

    const onVerifyCaptcha = (token: string) => {
        setValue('recaptcha', token);
        clearErrors('recaptcha')
    };

    return (
        <div className={classes.container}>
            <div className={classes.block} style={{ width: isMobile ? 'auto' : '568px' }}>
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
                            changeHandler={() => {
                                isSendCodeAvailable && setIsError(null);
                            }}
                            rules={RegistrationSchema.phoneString}
                            defaultValue={formValues.phoneString}
                            control={control}
                            errors={errors}
                            labelIcon={
                                <Tooltip
                                    title='Подсказка'
                                    message='Сюда нужно ввести номер телефона, на который мы отправим SMS.'
                                    position='top-right'
                                >
                                    <Icon.question className='[&>*]:hover:fill-primary [&>*]:hover:fill-primary' />
                                </Tooltip>
                            }
                        />
                    </div>
                    {showCaptcha
                        && <div className='m-5 flex justify-center'>
                            <ReCaptcha onChange={onVerifyCaptcha} error={errors.recaptcha}/>
                        </div>
                    }
                    <div>
                        <Button 
                            classnames='w-full' 
                            disabled={Boolean(Object.keys(errors).length) || isLoading || !isSendCodeAvailable}
                        >
                            Отправить код
                        </Button>
                    </div>
                </form>

                {/* <ReCaptcha onVerifyCaptcha={onVerifyCaptcha} /> */}
                
            </div>
        </div>
   )
}