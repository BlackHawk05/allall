import { http } from '~/utils/http';
import { IRegistration, IUserData } from './interfaces';
import { ICodeSend } from '../auth/interfaces';



export const getUserData = async (): Promise<IUserData> => {
    return await http.get<
        any, // request
        IUserData // response
    >(
        '/supplier-profile/personal/me',
    );
};

export const saveUserData = async (payload): Promise<any> => {
    return await http.put<
        IRegistration['req'], // request
        {
            me: IUserData;
            status: ICodeSend['res'];
        } // response
    >(
        '/supplier-profile/personal/me',
        {
            ...payload
        }
    );
};

export const registerUser = async ({ payload }): Promise<any> => {
    return await http.post<
        IRegistration['req'],
        any
    >(
        '/supplier-profile/registration',
        {
            ...payload
        }
    );
};

export const getUserAvatar = async (): Promise<IUserData> => {
    return await http.get<
        any, // request
        IUserData // response
    >(
        '/supplier-profile/personal/me',
    );
};