import { IUserData } from "../user/interfaces";

export interface ICodeSend {
    res: {
        time_until_next_code_send?: number;
        total_attempts_code_sending?: number;
        used_attempts_code_sending?: number;
    },
    req: {
        phone: string;
        recaptcha?: string;
    }
}

export interface ICodeLogin {
    res: {
        tokens: ITokensResponse;
        me: IUserData;
    },
    req: {
        phone: string;
        code: string;
        hash?: string;
    }
}

export interface ITokensResponse {
    token: string;
    refresh_token: string;
    status: string;
}

export interface IRefreshToken {
    refresh_token: string;
}

export interface ITokens {
    token: string;
    refresh_token: string;
}
