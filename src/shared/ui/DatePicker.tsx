import React, { useRef } from 'react';
import classNames from 'classnames';
import Datepicker from 'react-multi-date-picker';
import { Controller } from 'react-hook-form';
import * as Icons from '~/images/icon'

interface IProps {
    label?: string;
    classnames?: string;
    onChange?: any;
    name: string;
    control?: any;
    defaultValue?: string;
    errors?: any;
    labelIcon?: any;
}

const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

export const DatePicker = React.forwardRef<any, IProps>((props, ref) => {
    const {
        label,
        classnames,
        onChange,
        name,
        control,
        defaultValue,
        errors,
        labelIcon,
    } = props;

    const datePickerRef = useRef<any>();

    const classes = {
        block: classNames([
            'relative',
            classnames
        ]),
        field: classNames([
            'custom-input-date custom-input-date-1 w-full rounded border-[1.5px] bg-transparent py-4 px-5 font-medium outline-none transition dark:bg-form-input',
            (errors && errors[name]) ? 'border-red' : 'border-stroke focus:border-primary dark:focus:border-primary'

        ])
    }

    const handleClick = () => {
        if (datePickerRef.current){
            datePickerRef.current.openCalendar();
        }
    }

    return (
        <div className={classes.block}>
            {label
                && <div className='flex gap-2 items-center mb-2.5 block font-bold text-black dark:text-white'>
                    {label}
                    {labelIcon && <div>{labelIcon}</div>}
                </div>
            }
            <div className='relative'>
                <Controller
                    control={control}
                    name={name}
                    rules={{ required: true }} //optional
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                        <>
                            <Datepicker
                                value={value || ''}
                                onChange={(value) => {
                                    onChange(value?.isValid ? value?.toDate() : '');
                                }}
                                format={'DD.MM.YYYY'}
                                inputClass={classes.field}
                                placeholder='01.01.1999'
                                className='purple'
                                weekDays={weekDays}
                                months={months}
                                ref={datePickerRef}
                                minDate="1900/01/01"
                                maxDate={new Date()}
                                defaultValue={defaultValue}
                                containerClassName='block w-full'
                            />
                            <span className='absolute top-1/2 right-4 -translate-y-1/2'>
                                <Icons.calendar onClick={handleClick}/>
                            </span>
                        </>
                    )}
                />
                
            </div>
        </div>
    )
})