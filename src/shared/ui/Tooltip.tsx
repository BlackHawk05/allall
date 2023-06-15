import React, { useState } from 'react';

import styles from './styles.module.scss'
import classNames from 'classnames';
import { title } from 'process';
import { strstr } from '~/utils/helpers';

interface IProps {
    message: any;
    children: any;
    classname?: any;
    arrow?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top' | 'left' | 'right';
    show?: boolean;
    title?: any;
}

export const Tooltip: React.FC<IProps> = (props) => {
    const { message, children, classname, arrow, show = false, title } = props;
    const [ isShow, setIsShow ] = useState<boolean>(show);

    const classes = {
        container: classNames([
            'group relative flex justify-center'
        ]),
        tooltip: classNames([
            isShow ? 'scale-100' : 'scale-0', //group-hover:scale-100 
            'z-10 border-whiten bg-whiten text-black absolute transition-all rounded-lg p-4 font-bold',
            classname
        ]),
        arrow: classNames([
            'absolute h-0 w-0',
            strstr({ haystack: arrow, needle: 'bottom'}) && [
                '-bottom-3 border-x-10 border-x-transparent border-t-[0.75rem] border-t-whiten',
                arrow === 'bottom-left' && 'left-5',
                arrow === 'bottom-right' && 'right-5',
                arrow === 'bottom-center' && 'left-0 right-0 ml-auto mr-auto',
            ]
        ]),
        title: classNames([
            'flex opacity-50 text-sm items-center mb-1'
        ])
    }

    const handleClose = () => {
        setIsShow(false);
    }

    return (
        <div className={classes.container}
            onMouseEnter={() => {
                setIsShow(true);
            }}
        >
            {children}
            <div className={classes.tooltip}>
                <div className={classes.title}>
                    {title && <div>{title}</div>}
                    <div className='ml-auto cursor-pointer px-2 pb-1' onClick={handleClose}>x</div>
                </div>
                {message}
                {arrow && <div className={classes.arrow}></div>}
            </div>
        </div>
    )
}