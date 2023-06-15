import React, { useState } from 'react';
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

const SignIn: React.FC = () => {
    const [ isComplite, setIsComplite ] = useState<boolean>(false);
    const formValues = useStore(RegStore.$regValues);

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
        <div className='h-full flex flex-col'>
            <div className='grow flex justify-center'>
                <div className={classnames}>
                    {renderForm()}
                </div>
            </div>
            <div className='p-5 flex justify-end'>
                <Tooltip
                    message='Напишите ваш вопрос, мы ответим как можно скорее.'
                    arrow='bottom-right'
                    classname='w-80 -left-64 -top-31'
                    title='Готовы помочь вам в любое время'
                    show={true}
                >
                    <SupportButton />
                </Tooltip>
            </div>
        </div>
    )
}

export default SignIn;
