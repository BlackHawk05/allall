import React, { useEffect, useState } from 'react';
import { FirstStepForm } from './FirstStepForm';
import { RegStore } from '~/store';
import { useStore } from 'effector-react';
import { SecondStepForm } from './SecondStepForm';
import { ThirdStepForm } from './ThirdStepForm';
import * as Icons from '~/images/icon'

interface IProps {
    setIsComplite: any;
}

export const MobileForm: React.FC<IProps> = ({ setIsComplite }) => {
    const [ step, setStep ] = useState<'first' | 'second' | 'third'>('first');
    const formValues = useStore(RegStore.$regValues);

    const renderStep = () => {

        switch (step) {
            case 'first':
                return (
                    <FirstStepForm
                        setStep={setStep}
                    />
                )

            case 'second':
                return (
                    <SecondStepForm
                        setStep={setStep}
                    />
                )

            case 'third':
                return (
                    <ThirdStepForm
                        setIsComplite={setIsComplite}
                        setStep={setStep}
                    />
                )
        }
    }

    const handleBack = () => {

        if (step === 'third') {
            setStep('second');
        } else if (step === 'second') {
            setStep('first');
        } else if (step === 'first') {
            RegStore.saveRegData({
                ...formValues,
                inn: null
            });
        }
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

    return (
        <div className='mt-10 flex-grow rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='relative'>
                <div className='absolute p-5 cursor-pointer'>
                    <Icons.arrow onClick={handleBack}/>
                </div>
                {renderStep()}
            </div>
        </div>
    )
}