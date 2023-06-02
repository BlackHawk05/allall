import React from 'react';
import classNames from 'classnames';

import * as Icons from '~/images/icon'

interface IProps {
    values: {
        id?: number;
        name: string;
        value: string;
    }[];
    label?: string;
    iconStart?: any;
    classnames?: string;
}

export const SelectField = React.forwardRef<any, IProps>((props, ref) => {
    const {
        values,
        label,
        iconStart,
        classnames,
        ...rest
    } = props;

    const classes = {
        select: classNames([
            'relative w-full appearance-none rounded border border-stroke bg-transparent py-4 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input',
            iconStart ? 'pl-12' : 'pl-4',
        ]),
        block: classNames([
            'relative bg-white dark:bg-form-input',
            classnames,
        ])
    }

    return (
        <div className={classes.block}>
            {label
                && <label className='mb-2.5 block font-bold text-black dark:text-white'>
                    {label}
                </label>
            }
            <div className='relative bg-white dark:bg-form-input'>
                {iconStart
                    && <span className='absolute top-1/2 left-4 -translate-y-1/2'>
                        {iconStart}
                    </span>
                }
                <select 
                    className={classes.select}
                    ref={ref}
                    {...rest}
                >
                    {values?.map((item, index) => 
                        <option key={index} value={item.value}>{item.name}</option>
                    )}
                </select>
                <span className='absolute top-1/2 right-4 -translate-y-1/2'>
                    <Icons.dropdown />
                </span>
            </div>
        </div>
    )
})