export interface IOrganization {
    full_organization_name: string;
    short_organization_name: string;
    type: TOrganizationType;
    ogrn: string;
    inn: string;
    kpp: string;
    ceo: {
        first_name: string;
        last_name: string;
        middle_name: string;
    }
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