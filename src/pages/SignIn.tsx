import React, { useEffect, useState } from 'react';
import classNames from 'classnames'

import { FormAuth } from '~/components/AuthForms/components/FormAuth';
import { FormSmsCode } from '~/components/AuthForms/components/FormSmsCode';
import { FormRegOne } from '~/components/AuthForms/components/FormRegOne';
import { FormRegTwo } from '~/components/AuthForms/components/FormRegTwo';
import { RegComplite } from '~/components/AuthForms/components/RegComplite';
import { SupportButton } from '~/shared/ui/SupportButton';
import { Tooltip } from '~/shared/ui/Tooltip';
import { useStore } from 'effector-react';
import { RegStore } from '~/store';
import { UserStore } from '~/services/user';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
    const [ isComplite, setIsComplite ] = useState<boolean>(false);
    const formValues = useStore(RegStore.$regValues);
    const user = useStore(UserStore.$user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    const renderForm = () => {
        if (isComplite) {
            return <RegComplite setIsComplite={setIsComplite} />
        } else if (formValues?.inn) {
            return <FormRegTwo setIsComplite={setIsComplite} />
        }
        else if (formValues?.code) {
            return <FormRegOne />
        }
        else if (formValues?.phone) {
            return <FormSmsCode />
        } else {
            return <FormAuth />
        }
    }

    const classnames = classNames([
        'flex basis-full justify-center',
        formValues?.inn ? 'items-start' : 'items-center'
    ]);

    return (
        <div className='h-full flex flex-col bg-hero'>
            <div className='grow flex justify-center'>
                <div className={classnames}>
                    {renderForm()}
                </div>
            </div>
            <div className='p-5 flex justify-end'>
                <Tooltip
                    title='Готовы помочь вам в любое время'
                    message='Напишите ваш вопрос, мы ответим как можно скорее.'
                    position='top-left'
                    show={true}
                    width='20rem'
                >
                    <SupportButton />
                </Tooltip>
            </div>
        </div>
    )
}

export default SignIn;
