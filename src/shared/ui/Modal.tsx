import React, { useState } from 'react';
import { Button } from './Button';

interface IProps {
    children?: any;
    onClose?: any;
    title?: string;
    button?: string;
    buttonAction?: any;
}

export const Modal: React.FC<IProps> = ({
    children,
    onClose,
    title,
    button,
    buttonAction,
}) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(true);

    const handleClose = () => {
        setIsOpen(false);
        onClose && onClose();
    }

    return isOpen ? (
        <>
            <div
                className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            >
                <div className='relative w-auto my-6 mx-auto max-w-3xl'>

                    <div 
                        className='p-4 sm:p-12.5 xl:p-17.5 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'
                        style={{ width: '570px' }}
                    >
                        
                            {title
                                && <div className='flex flex-col items-center text-center rounded-t'>
                                    <h3 className='text-3xl font-semibold text-black p-6'>
                                        {title}
                                    </h3>
                                    <div className='h-1 bg-primary' style={{ width: '90px' }}></div>
                                </div>
                            }
                        
                        <div className='relative p-6 flex-auto'>
                            {children}
                        </div>
                        {/*footer*/}
                        <div className='flex gap-5 pt-6'>
                            <div className='w-1/2'>
                                <Button
                                classnames='w-full'
                                    type='secondary'
                                    onClick={() => setIsOpen(false)}
                                >
                                    Закрыть
                                </Button>
                            </div>
                            <div className='w-1/2'>
                                <Button
                                    classnames='w-full'
                                    onClick={() => {
                                        buttonAction();
                                        setIsOpen(false);
                                    }}
                                >
                                    {button}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='opacity-75 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null

    // return isOpen
    //     ? <div className='absolute bg-dark flex justify-center'>
    //         <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
    //             {title
    //                 && <div className='mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>{title}</div>
    //             }
    //             {children}
    //         </div>
    //     </div>
    //     : null
}