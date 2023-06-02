import { http } from '~/utils/http';
import { ICodeLogin, ICodeSend, IRefreshToken, ITokens, ITokensResponse } from './interfaces';

export const codeSend = async (data: ICodeSend['req']): Promise<ICodeSend['res']> => {
    return await http.post<
        ICodeSend['req'], 
        ICodeSend['res']
    >(
        '/supplier-profile/authentication/code/send', 
        data
    );
};

export const codeLogin = async (data: ICodeLogin['req']): Promise<ICodeLogin['res']> => {
    return await http.post<
        ICodeLogin['req'], 
        ICodeLogin['res']
    >(
        '/supplier-profile/authentication/code/login', 
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

export const setTokens = (props: ITokens) => {
    const { token, refresh_token } = props;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refresh_token);
}

export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export const getTokens = () => {
    return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    }
}