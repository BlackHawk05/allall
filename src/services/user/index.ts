import { http } from '~/utils/http';
import { IRegistration, IUserData } from './interfaces';

import {createStore, createEvent} from 'effector'
import { ICodeLogin } from '~/services/auth/interfaces';

export const saveUserData = createEvent<ICodeLogin['res']['me']>();

export const $user = createStore(null).on(saveUserData, (_, data) => data)

export const getUserData = async (): Promise<IUserData> => {
    return await http.get<
        any,
        IUserData
    >(
        '/supplier-profile/personal/me',
    );
};

export const registerUser = async ({ payload }): Promise<IRegistration['res']> => {
    return await http.post<
        IRegistration['req'],
        IRegistration['res']
    >(
        '/supplier-profile/registration',
        {
            ...payload
        }
    );
};
