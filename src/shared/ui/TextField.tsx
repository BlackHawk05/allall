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
    labelIcon?: any;
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
        labelIcon,
        disabled,
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

    const renderField = ({ onChange, onBlur, value, name }) => {
        return (
            <>
                {type === 'textarea'
                    ? <textarea></textarea>
                    : (mask
                        ? <InputMask
                            mask={mask}
                            alwaysShowMask={false}
                            maskPlaceholder=''
                            type={type}
                            placeholder={placeholder}
                            className={classes.field}
                            defaultValue={defaultValue}
                            onChange={(e) => {
                                const val = e.target.value;
                                onChange(val);
                                changeHandler && changeHandler(val);
                            }}
                            disabled={disabled}
                            ref={ref}
                            {...rest}
                        />
                        : <input
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            className={classes.field}
                            defaultValue={value}
                            onChange={(e) => {
                                const val = e.target.value;                                
                                onChange(val);
                                changeHandler && changeHandler(val);
                            }}
                            disabled={disabled}
                        />
                    )
                }
                {iconEnd
                    && <span className='-m-10'>
                        {iconEnd}
                    </span>
                }
            </>
        )
    }

    return <div className={classes.block}>
        {label
            && <div className='flex gap-2 items-center mb-2.5 block font-bold text-black dark:text-white'>
                <div className='overflow-hidden whitespace-nowrap text-ellipsis'>{label}</div>
                {labelIcon && <div>{labelIcon}</div>}
            </div>
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
                    rules={rules}
                    render={({
                        field: { onChange, onBlur, value, name },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                    }) => {
                        return renderField({ onChange, onBlur, value, name })
                    }}
                />
            
        </div>
    </div>
})