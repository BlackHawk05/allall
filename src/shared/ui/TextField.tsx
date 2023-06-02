import classNames from 'classnames';
import React from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface IProps {
    label?: string;
    type?: 'text' | 'number' | 'textarea' | 'url';
    placeholder?: string;
    classnames?: string;
    defaultValue?: string | number;
    iconStart?: any;
    iconEnd?: any;
    mask?: any;
    changeHandler?: any;
    control?: any;
    rules?: RegisterOptions;
    name?: string;
    disabled?: boolean;
    errors?: any;
}

export const TextField = React.forwardRef<any, IProps>((props, ref) => {
    const {
        label,
        type = 'text',
        placeholder,
        classnames,
        defaultValue,
        iconStart,
        iconEnd,
        mask,
        control,
        rules,
        name,
        changeHandler,
        errors,
        ...rest
    } = props;

    const classes = {
        field: classNames([
            'w-full transition rounded-lg border bg-transparent py-4 outline-none  focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input',
            iconStart && 'pl-10 pr-6',
            iconEnd && 'pl-6 pr-10',
            (!iconStart && !iconEnd) && 'px-4',
            (errors && errors[name]) ? 'border-red' : 'border-stroke focus:border-primary dark:focus:border-primary'
        ]),
        block: classNames([
            'relative',
            classnames
        ]),
        container: classNames([
            'relative flex items-center',
        ])
    }

    return <div className={classes.block}>
        {label
            && <label className='mb-2.5 block font-bold text-black dark:text-white'>
                {label}
            </label>
        }
        <div className={classes.container}>
            {iconStart
                && <span className='absolute ml-3 m-auto'>
                    {iconStart}
                </span>
            }
            <Controller
                    control={control}
                    name={name}
                    rules={rules} //optional
                    render={({
                        field: { onChange, onBlur, value, name },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                    }) => (
                        <>
                            {type === 'textarea'
                                ? <textarea></textarea>
                                : (mask
                                    ? <InputMask
                                        mask={mask}
                                        alwaysShowMask={false}
                                        maskPlaceholder=''
                                        type={'text'}
                                        placeholder={placeholder}
                                        className={classes.field}
                                        defaultValue={defaultValue}
                                        onChange={(e) => {
                                            const val = e.target.value;                                            
                                            onChange(val);
                                            changeHandler && changeHandler(val);
                                        }}
                                        ref={ref}
                                        {...rest}
                                    />
                                    : <input 
                                        type={type}
                                        placeholder={placeholder}
                                        className={classes.field}
                                        defaultValue={defaultValue}
                                        onChange={(e) => {
                                            const val = e.target.value;                                            
                                            onChange(val);
                                            changeHandler && changeHandler(val);
                                        }}
                                        ref={ref}
                                        {...rest}
                                    />
                                )
                            }
                            {iconEnd
                                && <span className='-m-10'>
                                    {iconEnd}
                                </span>
                            }
                        </>
                    )}
                />
        </div>
    </div>
})