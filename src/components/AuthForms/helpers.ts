import { IRegistration } from "~/services/user/interfaces";
import { ISignInValues } from "./interfaces";

export const payloadData = (data: ISignInValues): IRegistration['req'] => {

    return {
        fio: data.fio,
        email: data.email,
        inn: data.inn,
        site_url: data.siteUrl || 'https://lk.allall.ru',
        full_organization_Name: data.fullOrganizationName,
        short_organization_name: data.shortOrganizationName,
        smz: data.smz,
        ogrn: data.ogrn,
        kpp: data.kpp || '000000',
        ceo: {
            first_name: data.firstName,
            last_name: data.lastName,
            middle_name: data.middleName,
            birth_date: data.birthdate,
            phone: data.phone,
            country: data.citizenship,
        },
        bank_account: {
            account: data.billNumber,
            bank_name: data.bankName,
            bik: data.bic,
        },
        legal_address: {
            type: data.addressType,
            zip: data.zipcode,
            country: data.countryIso,
            city: data.city,
            street: data.address,
        }
    }
}