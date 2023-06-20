import React from 'react';
import { Tooltip } from '~/shared/ui/Tooltip';
import * as Icon from '~/images/icon';

interface IProps {
    message?: any;
    title?: any;
    width?: string;
}

export const LabelIcon: React.FC<IProps> = (props) => {
    const { message, title, width } = props;

    return (
        <Tooltip
            title={title}
            message={message}
            position='top-right'
            width={width && width}
        >
            <Icon.question className='[&>*]:fill-lightgray [&>*]:hover:fill-primary' />
        </Tooltip>
    )
}