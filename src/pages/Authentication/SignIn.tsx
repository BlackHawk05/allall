import React, { useState } from 'react';
import classNames from 'classnames'

import { ISignInValues } from '~/components/AuthForms/interfaces';
import { FormAuth } from '~/components/AuthForms/components/FormAuth';
import { FormSmsCode } from '~/components/AuthForms/components/FormSmsCode';
import { FormRegOne } from '~/components/AuthForms/components/FormRegOne';
import { FormRegTwo } from '~/components/AuthForms/components/FormRegTwo';
import { IRegistration } from '~/services/user/interfaces';
import { RegComplite } from '~/components/AuthForms/components/RegComplite';

const defaultValues: ISignInValues = {
    smz: false,
    siteUrl: ''
}

const SignIn: React.FC = () => {
    const [ formValues, setFormValues ] = useState<ISignInValues>(defaultValues);
    const [ isComplite, setIsComplite ] = useState<IRegistration['res']>(null);

    const renderForm = () => {
        if (isComplite) {
            return <RegComplite isComplite={isComplite} />
        } else if (formValues?.inn) {
            return <FormRegTwo setIsComplite={setIsComplite} formValues={formValues} setFormValues={setFormValues} />
        }
        else if (formValues?.code) {
            return <FormRegOne setFormValues={setFormValues} formValues={formValues} />
        }
        else if (formValues?.phone) {
            return <FormSmsCode setFormValues={setFormValues} formValues={formValues} />
        } else {
            return <FormAuth setFormValues={setFormValues} formValues={formValues}/>
        }
    }

    const classnames = classNames([
        'flex',
        formValues?.inn ? 'items-start' : 'items-center'
    ]);    

    return (
        <div className='h-full flex justify-center'>
            <div className={classnames}>
                {renderForm()}
            </div>
        </div>
    )
}

export default SignIn;
