import { ITokensResponse } from '../auth/interfaces';

export interface IUserData {
    id: number;
    avatar_url: string;
    name: string;
    phone: string;
    email: string;
    status: 'ACTIVE' | 'UNDER_CONSIDERATION' | 'BANNED';
}

export interface IRegistration {
    res: {
        tokens: ITokensResponse;
        me: IUserData;
    },
    req: {
        fio: string;
        email: string;
        inn: string;
        site_url: string;
        full_organization_Name: string;
        short_organization_name: string;
        smz: boolean;
        ogrn: string;
        kpp: string;
        ceo: {
            first_name: string;
            last_name: string;
            middle_name: string;
            birth_date: Date;
            phone: string;
            country: string;
        }
        bank_account: {
            account: string;
            bank_name: string;
            bik: string;
        }
        legal_address: {
            type: TAddressType;
            zip: string;
            country: string;
            city: string;
            street: string;
        }
    }
}

export type TAddressType = 'legal' | 'actual' | 'post' | 'other';