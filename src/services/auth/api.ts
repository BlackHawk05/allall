import { http } from '~/utils/http';
import { ICodeLogin, ICodeSend, IRefreshToken, ITokensResponse } from './interfaces';

export const checkPhone = async (data: ICodeSend['req']): Promise<any> => {
    return await http.post<
        ICodeSend['req'], 
        any
    >(
        '/supplier-profile/access-recovery/check-phone', 
        data
    );
};

export const authCodeSend = async (data: ICodeSend['req']): Promise<ICodeSend['res']> => {
    return await http.post<
        ICodeSend['req'], 
        ICodeSend['res']
    >(
        '/supplier-profile/authentication/code/send', 
        data
    );
};

export const regCodeSend = async (data: ICodeSend['req']): Promise<ICodeSend['res']> => {
    return await http.post<
        ICodeSend['req'], 
        ICodeSend['res']
    >(
        '/supplier-profile/registration/code/send', 
        data
    );
};

export const authCodeLogin = async (data: ICodeLogin['req']): Promise<ICodeLogin['res']> => {
    return await http.post<
        ICodeLogin['req'], 
        ICodeLogin['res']
    >(
        '/supplier-profile/authentication/code/login', 
        data
    );
};

export const regCodeLogin = async (data: ICodeLogin['req']): Promise<ICodeLogin['res']> => {
    return await http.post<
        ICodeLogin['req'], 
        ICodeLogin['res']
    >(
        '/supplier-profile/registration/code/login', 
        data
    );
};

export const refreshToken = async (): Promise<ITokensResponse> => {
    const data = {
        refresh_token: localStorage.getItem('refreshToken')
    }
    return await http.post<
        IRefreshToken, 
        ITokensResponse
    >(
        '/supplier-profile/authentication/refresh', 
        data
    );
};

