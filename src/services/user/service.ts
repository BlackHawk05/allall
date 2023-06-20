import { ISignInValues } from "~/components/AuthForms/interfaces";
import { phoneMask } from "~/utils/helpers";
import { IRegistration } from "./interfaces";

export const userDataParse = ({ user }): ISignInValues => {
    return user
        ? {
            fio: user.name,
            siteUrl: user.legal_entity?.site_url,
            city: user.legal_entity_address?.city,
            phone: user.phone,
            phoneString: phoneMask(user.phone),
            zipcode: user.legal_entity_address.zip,
            countryIso: user.legal_entity_address?.country,
            email: user.email,
            addressType: user.legal_entity_address.type,
            address: user.legal_entity_address.street,
            fullOrganizationName: user.legal_entity.full_name,
            shortOrganizationName: user.legal_entity.short_name,
            lastName: user.ceo.last_name,
            firstName: user.ceo.first_name,
            middleName: user.ceo.middle_name,
            citizenship: user.ceo.country,
            smz: user.legal_entity.smz,
            ogrn: user.legal_entity.ogrn,
            birthdate: user.ceo.birth_date,
            inn: user.legal_entity.inn,
            kpp: user.legal_entity.kpp,
            bic: user.bank_account.bik,
            billNumber: user.bank_account.account,
            bankName: user.bank_account.bank_name,
        }
        : {};
}

export const prepareUserData = (data: ISignInValues): IRegistration['req'] => {

    return {
        avatar: data.avatarBase64 || '',
        fio: data.fio,
        email: data.email,
        phone: data.phone,
        inn: data.inn,
        site_url: data.siteUrl || 'https://lk.allall.ru',
        full_organization_name: data.fullOrganizationName,
        short_organization_name: data.shortOrganizationName,
        smz: data.smz || false,
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