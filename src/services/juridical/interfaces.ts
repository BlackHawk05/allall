export interface IOrganization {
    full_organization_name: string;
    short_organization_name: string;
    type: TOrganizationType;
    ogrn: string;
    inn: string;
    kpp: string;
    ceo: ICeoData;
}

export type TOrganizationType = 'LEGAL' | 'INDIVIDUAL';

export interface IGetByInnResponse {
    items: IOrganization[];
}

export interface IBank {
    bic: string;
    bank_name: string;
}

export interface IGetByBicResponse {
    items: IBank[];
}

export interface IGetAddressByZipResponse {
    items: IAddress[];
}

export interface IAddress {
    full: string;
    city: string;
    street: string;
    country: string;
    zip: string;
}

export interface ILegalEntity {
    id: number;
    full_name: string;
    short_name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    site_url: string;
    smz: boolean;
}

export interface IBankAccount {
    account: string;
    bank_name: string;
    bik: string;
    details?: string;
    tax?: number;
}

export interface ILegalAddress {
    type: TAddressType;
    zip: string;
    country: string;
    city: string;
    street: string;
}

export interface ILegalEntityAddress extends ILegalAddress {
    id: number;
}

export interface ILegalEntityError {
    id: number;
    status: number;
    message: string;
    errors: IErrors[];
}

export interface IErrors {
    field: string;
    errors: string[];
}

export interface ICeoData {
    first_name: string;
    last_name: string;
    middle_name: string;
    birth_date: Date;
    phone: string;
    country: string;
}

export type TAddressType = 'legal' | 'actual' | 'post' | 'other';