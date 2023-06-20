import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ReactInputVerificationCode from "react-input-verification-code";

import { ISignInValues } from '../../interfaces';
import styles from './styles.module.scss'
import { AuthLogo } from '../AuthLogo';
import * as Icons from '~/images/icon'
import { Modal } from '~/shared/ui/Modal';
import { AuthApi, AuthService } from '~/services/auth';
import { ICodeLogin } from '~/services/auth/interfaces';
import { UserStore } from '~/services/user';
import { useNavigate } from 'react-router-dom';
import { SmsTimeCounter } from '../SmsTimeCounter';
import { useConfig } from '~/hooks/useConfig';
import * as Icon from '~/images/icon';
import { Tooltip } from '~/shared/ui/Tooltip';
import { ReCaptcha } from '~/shared/ui/ReCaptcha';
import { useStore } from 'effector-react';
import { RegStore } from '~/store';

const COUNT_LONG = 60;
const CODE_LENGTH = 4;
const COUNT_LIMIT = 30;

export const FormSmsCode: React.FC = () => {   
    const [ isSendCodeAvailable, setIsSendCodeAvailable ] = useState<boolean>(false);
    const [ countLong, setCountLong ] = useState<number>(COUNT_LONG);
    const [ isError, setIsError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { isMobile } = useConfig();
    const [ showCaptcha, setShowCaptcha ] = useState<boolean>(false);
    const [ reCaptcha, setReCaptcha ] = useState<string>('');
    const [ reCaptchaError, setReCaptchaError ] = useState<boolean>(false);
    const [ isCode, setIsCode ] = useState<string>();
    const formValues = useStore(RegStore.$regValues);

    const navigate = useNavigate();

    const onVerifyCaptcha = (token: string) => {
        setReCaptcha(token);
        setReCaptchaError(false);

        isCode && onCompleted(isCode);
    };  

    const onCompleted = async (code: string) => {
        
        setIsCode(code);

        if (showCaptcha && !reCaptcha) {
            setReCaptchaError(true);
            return false;
        }

        setIsLoading(true);

        if (formValues.isReg) {
            await AuthApi.regCodeLogin({
                phone: formValues.phone,
                code,
            })
            .then((response: ICodeLogin['res']) => {
                checkLogin({
                    response,
                    code,
                });
            })
            .catch((err: Error) => {
                setIsError(err.message);
            });
        } else {
            await AuthApi.authCodeLogin({
                phone: formValues.phone,
                code,
            })
            .then((response: ICodeLogin['res']) => {
                checkLogin({
                    response,
                    code,
                });
            })
            .catch((err: Error) => {
                setIsError(err.message);
            });
        }

        setIsLoading(false);
        setCountLong(COUNT_LONG);
    }

    const checkLogin = ({
        response,
        code,
    }) => {
        if (response.tokens) {
            AuthService.setTokens(response.tokens);
        }
        
        if (response.me.status === 'BANNED') {
            setIsError('Пользователь заблокирован');
        } else if (response.me?.status !== 'UNDER_CONSIDERATION') {
            // UserStore.saveUserData(response.me);
            AuthService.checkAuth();
            navigate('/');
        } else {
            RegStore.saveRegData({
                ...formValues,
                code
            })
        }
    }

    const onChange = () => {
        setIsError(null);
    }

    useEffect(() => {   
        const counter = () => {
            setCountLong(countLong - 1);
        }

        if (countLong > 0) {
            setTimeout(() => counter(), 1000);
        }
    })

    const sendCode = () => {
        setIsSendCodeAvailable(false);
        setCountLong(COUNT_LONG);

        if (formValues.isReg) {
            AuthApi.regCodeSend({
                phone: formValues.phone,
                recaptcha: reCaptcha
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
            AuthApi.authCodeSend({
                phone: formValues.phone,
                recaptcha: reCaptcha
            })
            .catch((err: any) => {
                const { response } = err;

                if (response?.status === 409) {
                    setShowCaptcha(true);
                } else {
                    setIsError(err.message);
                }
            });
        }
    }

    const handleBack = () => {
        RegStore.saveRegData({});
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

    const classes = {
        container: classNames([
            'rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark',
            isMobile && 'mt-10'
        ]),
        block: classNames([
            'md:border-l-2 md:border-stroke',
            isLoading && 'opacity-50',
            isMobile ? 'p-5 pt-12' : 'basis-1/2 p-12 sm:p-17.5'
        ]),
        error: classNames([
            'mb-5 block font-medium',
            isError && 'text-red',
        ]),
        verify: classNames([
            styles.container,
            isError && styles.error
        ])
    }

    return (
        <div className={classes.container}>
            <div className='absolute p-5 cursor-pointer'>
                <Icons.arrow onClick={handleBack}/>
            </div>
            <div className='flex' >
                {!isMobile
                    && <div className='md:w-1/2 w-0'>
                        <AuthLogo />
                    </div>
                }
                <div className={classes.block} style={{ maxWidth: '568px' }}>
                    <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                        Авторизация
                    </h2>
                    <span className={classes.error}>
                        {isError
                            || <>На ваш телефон <span className='text-primary'>{formValues.phoneString}</span> отправлен код. Пожалуйста, введите его ниже.</>
                        }
                    </span>
                    <span className='mb-5 block font-medium'>
                        Ошиблись номером ? <a onClick={handleBack}>Изменить</a>
                    </span>
                    <div className='mb-4'>
                        <div className='flex gap-2 items-center mb-2.5 block font-bold text-black dark:text-white'>
                            Код из SMS
                            <Tooltip
                                title='Подсказка'
                                message='Сюда нужно ввести SMS код.'
                                position='top-right'
                                >
                                <Icon.question className='[&>*]:hover:fill-primary' />
                            </Tooltip>
                        </div>
                        <div className={classes.verify}>
                            <ReactInputVerificationCode
                                onChange={onChange}
                                onCompleted={onCompleted}
                                placeholder=''
                                length={CODE_LENGTH}
                                autoFocus
                            />
                        </div>
                    </div>
                    {showCaptcha
                        && <div className='m-5 flex justify-center'>
                            <ReCaptcha onChange={onVerifyCaptcha} error={reCaptchaError}/>
                        </div>
                    }
                    {isSendCodeAvailable
                        ? <div className='mt-10'>
                            <a onClick={sendCode}>Повторно запросить код.</a>
                        </div>
                        : <span className='block font-medium text-center mt-10'>
                            Если Вы не получили код в течение двух минут, Вы можете повторно запросить его <span className='text-primary'>через {<SmsTimeCounter countLimit={COUNT_LIMIT} setIsSendCodeAvailable={setIsSendCodeAvailable}/>}с.</span>
                        </span>
                    }
                    {countLong <= 0
                        && <Modal title='Не приходит код?' button='Отправить еще раз' buttonAction={sendCode}>
                            <div className='text-center'>
                                Если код до сих пор не пришел, вы можете <a onClick={handleBack}>изменить номер</a> или <a onClick={handleBack}>связяться с поддержкой</a>
                            </div>
                        </Modal>
                    }
                </div>
            </div>
        </div>
   )
}