import { IBankAccount, ICeoData, ILegalAddress, ILegalEntity, ILegalEntityAddress, ILegalEntityError } from '../juridical/interfaces';

export type TUserStatus = 'ACTIVE' | 'UNDER_CONSIDERATION' | 'BANNED' | 'NOT_CONFIRMED';

export interface IUserData {
    id?: number;
    avatar?: string;
    name: string;
    phone: string;
    email: string;
    status: TUserStatus;
    title: string;
    description: string;
    grn: string;
    ip: string;
    pass_number: string;
    pass_date: Date;
    registration_date: Date;
    ceo: ICeoData;
    bank_account: IBankAccount;
    legal_entity: ILegalEntity;
    legal_entity_address: ILegalEntityAddress;
    legal_entity_error: ILegalEntityError;
}

export interface IUser {
    id: number;
    avatar_url: string;
    name: string;
    phone: string;
    email: string;
    status: TUserStatus
}

export interface IRegistration {
    req: {
        avatar?: string;
        fio: string;
        phone: string;
        email: string;
        site_url: string;
        full_organization_name: string;
        short_organization_name: string;
        smz: boolean;
        ogrn: string;
        kpp: string;
        inn: string;
        ceo: ICeoData;
        bank_account: IBankAccount;
        legal_address: ILegalAddress;
    }
}

