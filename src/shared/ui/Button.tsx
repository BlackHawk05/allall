import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss'

interface IProps {
    children?: any;
    classnames?: string;
    type?: 'primary' | 'secondary';
    disabled?: boolean;
    onClick?: any;
}

export const Button: React.FC<IProps> = (props) => {
    const {
        children,
        classnames,
        type = 'primary',
        disabled,
        onClick,
    } = props;

    const classButton = classNames([
        'flex items-center justify-center gap-1 rounded-lg border p-4 transition font-bold',
        type === 'primary' && 'border-primary bg-primary text-white',
        type === 'secondary' && 'border-whiten bg-whiten text-black',
        classnames,
        disabled ? 'opacity-50' : 'hover:bg-opacity-90',
    ])

    return (
        <button 
            className={classButton}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}