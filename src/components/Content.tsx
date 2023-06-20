import classNames from 'classnames';
import React from 'react';

interface IProps {
    children: any;
    classnames?: string;
}

export const Content: React.FC<IProps> = (props) => {
    const { children, classnames } = props;

    const classes = {
        container: classNames([
            'bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark',
            classnames && classnames
        ])
    }

    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}