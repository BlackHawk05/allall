import React from 'react';
import { Tooltip } from '~/shared/ui/Tooltip';
import * as Icon from '~/images/icon';

interface IProps {
    message?: any;
    title?: any;
}

export const LabelIcon: React.FC<IProps> = (props) => {
    const { message, title } = props;

    return (
        <Tooltip
            title={title}
            message={message}
            position='top-right'
            >
            <Icon.question className='[&>*]:hover:fill-primary' />
        </Tooltip>
    )
}