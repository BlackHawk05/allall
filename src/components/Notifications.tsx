import React from 'react';
import * as Icons from '~/images/icon'

interface IProps {
}

export const Notifications: React.FC<IProps> = (props) => {
    const {  } = props;

    return (
        <div className='cursor-pointer'>
            <Icons.notification className='[&>*]:hover:fill-primary'/>
        </div>
    )
}