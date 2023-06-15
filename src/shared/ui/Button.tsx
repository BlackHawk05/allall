import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss'
import { strstr } from '~/utils/helpers';

interface IProps {
    children?: any;
    classnames?: string;
    type?: 'primary' | 'secondary';
    size?: 'big3' | 'big2' | 'big' | 'medium' | 'small'
    disabled?: boolean;
    onClick?: any;
    endIcon?: any;
}

export const Button: React.FC<IProps> = (props) => {
    const {
        children,
        classnames,
        type = 'primary',
        size = 'medium',
        disabled,
        onClick,
        endIcon,
    } = props;

    const padding = {
        big3: 'p-7',
        big2: 'p-6',
        big: 'p-5',
        medium: 'p-4',
        small: 'p-2'
    }

    const classes = {
        button: classNames([
            'relative flex items-center justify-center gap-1 border transition font-bold',
            type === 'primary' && 'border-primary bg-primary text-white',
            type === 'secondary' && 'border-whiten bg-whiten text-black',
            padding?.[size],
            disabled ? 'opacity-50' : 'hover:bg-opacity-90',
            !strstr({
                haystack: classnames, 
                needle: 'rounded'
            }) && 'rounded-md',
            classnames,
        ]),
        endIcon: classNames([
            'absolute right-10'
        ])
    }

    return (
        <button 
            className={classes.button}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
            {endIcon && <div className={classes.endIcon}>{endIcon}</div>}
        </button>
    )
}