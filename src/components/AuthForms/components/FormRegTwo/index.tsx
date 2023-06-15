import React from 'react';

import { useConfig } from '~/hooks/useConfig';
import { DesktopForm } from './components/DesktopForm';
import { MobileForm } from './components/MobileForm';

interface IProps {
    setIsComplite: any;
}

export const FormRegTwo: React.FC<IProps> = ({ setIsComplite }) => {
    const { isMobile } = useConfig();

    return (
        <>
            {isMobile
                ? <MobileForm setIsComplite={setIsComplite} />
                : <DesktopForm setIsComplite={setIsComplite} />
            }
        </>
   )
}