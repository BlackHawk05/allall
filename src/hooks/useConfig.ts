import { useStore } from 'effector-react'
import { useEffect } from 'react';
import { $config, saveConfig } from '~/services/config'
import { IConfig } from '~/services/config/interfaces';

export const useConfig = (): IConfig => {
    const config = useStore($config);

    const handleWindowSizeChange = () => {
        saveConfig({
            ...config,
            isMobile: window.innerWidth <= 768
        });
    }

    useEffect(() => {
        handleWindowSizeChange();
    }, []);

    return config
}