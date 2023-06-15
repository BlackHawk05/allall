import React from 'react';
import { Button } from '~/shared/ui/Button';
import * as Icons from '~/images/icon'

interface IProps {
}

export const SupportButton: React.FC<IProps> = (props) => {
    const {  } = props;

    return (
        <Button
            type='secondary'
            classnames='relative rounded-3xl'
            
        >
            <Icons.chatAlt />
            <div className='absolute top-3.5 right-3.5 bg-primary w-4 h-4 border border-stroke border-2 rounded-full' ></div>
        </Button>

    )
}