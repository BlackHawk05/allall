import { RegisterOptions } from "react-hook-form";
import {
    checkINN, 
    checkOgrn, 
    checkBik,
} from 'ru-validation-codes';

interface ISchema {
    [key: string]: RegisterOptions;
}

export const RegistrationSchema: ISchema = {
    phoneString: {
        required: true, minLength: 18
    },
    fio: {
        required: true, minLength: 7, maxLength: 100
    },
    email: {
        required: true, pattern: /^\S+@\S+$/i
    },
    siteUrl: {
        pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        // /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        // /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/
    },
    fullOrganizationName: {
        required: true
    },
    shortOrganizationName: {
        required: true
    },
    organizationForm: {
        required: true
    },
    citizenship: {
        required: true
    },
    countryIso: {
        required: true
    },
    firstName: {
        required: true,
    },
    lastName: {
        required: true,
    },
    middleName: {
        required: true,
    },
    bic: {
        required: true, validate: checkBik, valueAsNumber: true,
    },
    ogrn: {
        required: true, valueAsNumber: true, //validate: checkOgrn, 
    },
    kpp: {
        required: true, valueAsNumber: true,
    },
    inn: {
        required: true, validate: checkINN, valueAsNumber: true,
    },
    billNumber: {
        required: true, valueAsNumber: true, minLength: 20, maxLength: 20
    },
    bankName: {
        required: true
    },
    addressType: {
        required: true
    },
    zipcode: {
        required: true, valueAsNumber: true, maxLength: 6, minLength: 6
    },
    city: {
        required: true
    },
    address: {
        required: true
    }
}