import { http } from '~/utils/http';
import { IRegistration, IUserData } from './interfaces';



export const getUserData = async (): Promise<IUserData> => {
    return await http.get<
        any,
        IUserData
    >(
        '/supplier-profile/personal/me',
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
