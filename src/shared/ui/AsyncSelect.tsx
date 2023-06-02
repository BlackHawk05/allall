import React, { useRef, useState } from 'react';
import classNames from 'classnames';
//import Datepicker from 'react-tailwindcss-datepicker'; 
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

import * as Icons from '~/images/icon'
import { getByBic } from '~/services/juridical';

interface IProps {
    label?: string;
    classnames?: string;
    handleCallback?: any;
    changeHandler?: any;
    name: string;
    control?: any;
    defaultOptions?: any;
    iconStart?: any;
    iconEnd?: any;
    placeholder?: string;
    rules?: any;
}

export const Asyncselect = React.forwardRef<any, IProps>((props, ref) => {
    const {
        label,
        classnames,
        name,
        control,
        defaultOptions,
        iconStart,
        iconEnd,
        handleCallback,
        placeholder,
        changeHandler,
        rules,
    } = props;

    const classes = {
        field: classNames([
            'w-full transition rounded-lg border border-stroke bg-transparent py-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
            iconStart && 'pl-10 pr-6',
            iconEnd && 'pl-6 pr-10',
            (!iconStart && !iconEnd) && 'px-4'
        ]),
        block: classNames([
            'relative',
            classnames
        ]),
        container: classNames([
            'relative flex items-center',
        ])
    }


    const promiseOptions = (inputValue: string) => new Promise<any[]>((resolve) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            resolve(handleCallback(inputValue));
        }, 500);
    });

    let timeout;

    const loadOptions = (
        inputValue: string,
        callback: (options) => void
    ) => {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            callback(false);
            const options = await handleCallback(inputValue);
            console.log('options:', options);
                      
            callback(options);
        }, 1000);
    };

    const handleChange = (e) => {
        console.log('e:', e);
        
    }

    return (
        <div className={classes.block}>
            {label
                && <label className='mb-2.5 block font-bold text-black dark:text-white'>
                    {label}
                </label>
            }
            <div className='relative'>
                <Controller
                    control={control}
                    name={name}
                    rules={rules} //optional
                    render={({
                        field: { onChange },
                    }) => (
                        <>
                            <AsyncSelect 
                                cacheOptions 
                                loadOptions={promiseOptions}
                                //onInputChange={handleInputChange}
                                defaultOptions={defaultOptions}
                                className={classes.field}
                                onChange={(value) => {
                                    if (value.isValid) {
                                        
                                    }
                                    onChange(value); 
                                    changeHandler(value);
                                }}
                                placeholder={placeholder}
                            />
                        </>
                    )}
                />
                
            </div>
        </div>
    )
})