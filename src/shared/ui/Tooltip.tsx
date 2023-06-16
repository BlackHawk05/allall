import React, { CSSProperties, useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import classNames from 'classnames';
import { strstr } from '~/utils/helpers';

interface IProps {
    message: any;
    children: any;
    width?: number;
    position: 'bottom-left' 
        | 'bottom-right' 
        | 'bottom-center' 
        | 'top-left' 
        | 'top-right' 
        | 'top-center';
    show?: boolean;
    title?: any;
}

const ARROW_OFFSET = 20;

export const Tooltip: React.FC<IProps> = (props) => {
    const { message, children, width, position, show = false, title } = props;
    const pos = position?.split('-');
    const [ isShow, setIsShow ] = useState<boolean>(show);
    const [ offsetX, setOffsetX ] = useState<number>(0);
    const [ offsetY, setOffsetY ] = useState<number>(0);
    const tooltipId = nanoid();

    if (!position) {
        return null;
    }

    const classes = {
        container: classNames([
            'group relative flex justify-center',
            `tooltip-container-${tooltipId}`
        ]),
        tooltip: classNames([
            `tooltip-${tooltipId}`,
            isShow ? 'scale-100' : 'scale-0',
            'z-10 border-whiten bg-whiten text-black absolute transition-all rounded-lg p-4 font-bold',
            width ? `w-${width}` : 'w-max',
            pos[0] && `${pos[0]}-0`,
            pos[1] === 'left' && 'right-0',
            pos[1] === 'right' && 'left-0',
        ]),
        arrow: classNames([
            'absolute h-0 w-0 border-x-10 border-x-transparent',
            strstr({ haystack: position, needle: 'top'}) && [
                '-bottom-3 border-t-[0.75rem] border-t-whiten',
            ],
            strstr({ haystack: position, needle: 'bottom'}) && [
                '-top-3 border-b-[0.75rem] border-b-whiten',
            ],
            pos[1] === 'left' && 'right-0',
            pos[1] === 'right' && 'left-0',
            pos[1] === 'center' && 'left-0 right-0 ml-auto mr-auto',
        ]),
        title: classNames([
            'flex opacity-50 text-sm items-center mb-1'
        ])
    }

    const arrowStyles: CSSProperties = {
        marginRight: pos[1] === 'left' && `${ARROW_OFFSET}px`,
        marginLeft: pos[1] === 'right' && `${ARROW_OFFSET}px`,
    }

    const tooltipStyles: CSSProperties = {
        marginTop: pos[0] === 'top' && `${offsetY}px`,
        marginBottom: pos[0] === 'bottom' && `${offsetY}px`,
        marginRight: pos[1] === 'left' ? `${offsetX}px` : '0',
        marginLeft: pos[1] === 'right' ? `${offsetX}px` : '0',
    }

    useEffect(() => {

        if (isShow) {
            const container = document.querySelector(`.tooltip-container-${tooltipId}`) as HTMLElement;
            const tooltip = document.querySelector(`.tooltip-${tooltipId}`) as HTMLElement;

            if (strstr({ haystack: position, needle: 'top'})) {
                setOffsetY((tooltip.offsetHeight + 15) * -1);
            } else if (strstr({ haystack: position, needle: 'bottom'})) {
                setOffsetY((tooltip.offsetHeight + 15) * -1);
            }

            switch (pos[1]) {
                case 'left':
                case 'right':
                    setOffsetX((container.offsetWidth - 18) / 2 - ARROW_OFFSET);
                    break;

                case 'center':
                    setOffsetX((container.offsetWidth - tooltip.offsetWidth) / 2);
                    break;
            }
        }
    }, [ isShow ])
    
    const handleClick = (e) => {
        if (e.nativeEvent.button === 2) {
            e.preventDefault();
            setIsShow(false);
        }
    };

    return (
        <div className={classes.container}
            onMouseEnter={() => {
                setIsShow(true);
            }}
            onMouseLeave={() => {
                setIsShow(false);
            }}
            onContextMenu={handleClick}
        >
            {children}
            <div className={classes.tooltip} style={tooltipStyles}>
                <div className={classes.title}>
                    {title && <div>{title}</div>}
                    {/* <div className='ml-auto cursor-pointer px-2 pb-1' onClick={handleClose}>x</div> */}
                </div>
                {message}
                <div className={classes.arrow} style={arrowStyles}></div>
            </div>
        </div>
    )
}