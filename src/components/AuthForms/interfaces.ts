import { TOrganizationType } from "~/services/juridical/interfaces";
import { TAddressType } from "~/services/user/interfaces";

export interface ISignInValues extends ISingnInPhone, ISingnInCode {
    fio?: string;
    email?: string;
    fullOrganizationName?: string;
    inn?: string;
    shortOrganizationName?: string;
    organizationForm?: TOrganizationType;
    smz?: boolean;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    birthdate?: Date;
    citizenship?: string;
    ogrn?: string;
    kpp?: string;
    bic?: string;
    billNumber?: string;
    bankName?: string;
    addressType?: TAddressType;
    zipcode?: string;
    city?: string;
    countryIso?: string;
    address?: string;
    siteUrl?: string;
}

export interface ISingnInCode {
    code?: string;
    phone?: string;
    hash?: string;
}

export interface ISingnInPhone {
    phoneString?: string;
    phone?: string;
}

