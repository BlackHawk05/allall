import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ReactInputVerificationCode from "react-input-verification-code";

import { ISignInValues } from '../../interfaces';
import styles from './styles.module.scss'
import { AuthLogo } from '../AuthLogo';
import { ReactComponent as IconArrow } from '~/images/icon/icon-arrow.svg'
import { Modal } from '~/shared/ui/Modal';
import { codeLogin, codeSend, setTokens } from '~/services/auth';
import { ICodeLogin } from '~/services/auth/interfaces';
import { saveUserData } from '~/services/user';
import { useNavigate } from 'react-router-dom';
import { SmsTimeCounter } from '../SmsTimeCounter';

interface IProps {
    setFormValues: (data: ISignInValues) => void;
    formValues: ISignInValues;
}

const COUNT_LONG = 60;
const CODE_LENGTH = 4;
const COUNT_LIMIT = 30;

export const FormSmsCode: React.FC<IProps> = ({ setFormValues, formValues }) => {   
    const [ isSendCodeAvailable, setIsSendCodeAvailable ] = useState<boolean>(false);
    const [ countLong, setCountLong ] = useState<number>(COUNT_LONG);
    const [ isError, setIsError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const navigate = useNavigate();

    const onCompleted = async (code: string) => { 
        setIsLoading(true);

        await codeLogin({
            phone: formValues.phone,
            code,
            hash: localStorage.getItem('hash')
        })
        .then((response: ICodeLogin['res']) => {

            if (response.tokens) {
                setTokens(response.tokens);
            }
            
            if (response.me.status === 'ACTIVE') {
                saveUserData(response.me);
                navigate('/');
            } else if (response.me.status === 'BANNED') {
                setIsError('Пользователь заблокирован');
            } else {
                setFormValues({
                    ...formValues,
                    code
                })
            }
        })
        .catch((err: Error) => {
            setIsError(err.message);
        });

        setIsLoading(false);
        setCountLong(COUNT_LONG);
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

        codeSend({
            phone: formValues.phone
        })
    }

    const classVerify = classNames([
        styles.container,
        isError && styles.error
    ]);

    const handleBack = () => {
        setFormValues({
            phoneString: formValues.phoneString
        });
    }

    const classBlock = classNames([
        'md:border-l-2 p-17.5 md:border-stroke',
        isLoading && 'opacity-50',
        styles.block
    ]);

    const classError = classNames([
        'mb-5 block font-medium',
        isError && 'text-red',
    ]);

    return (
        <div className='m-5 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex' >
                <div className='absolute p-5 cursor-pointer'>
                    <IconArrow onClick={handleBack}/>
                </div>
                <div className='md:w-1/2 w-0'>
                    <AuthLogo />
                </div>
                <div className={classBlock}>
                    <h2 className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                        Авторизация
                    </h2>
                    <span className={classError}>
                        {isError
                            //? <>Пожалуйста, проверьте корректность<br/>введенного кода.</>
                            || <>На ваш телефон <span className='text-primary'>{formValues.phoneString}</span> отправлен код. Пожалуйста, введите его ниже.</>
                        }
                    </span>
                    <span className='mb-5 block font-medium'>
                        Ошиблись номером ? <a onClick={handleBack}>Изменить</a>
                    </span>
                    <div className='mb-4'>
                        <label className='mb-2.5 block font-bold text-black dark:text-white'>
                            Код из SMS
                        </label>
                        <div className={classVerify}>
                            <ReactInputVerificationCode
                                onChange={onChange}
                                onCompleted={onCompleted}
                                placeholder=''
                                length={CODE_LENGTH}
                                autoFocus
                            />
                        </div>
                    </div>
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