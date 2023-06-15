import { useStore } from "effector-react";
import { ISignInValues } from "~/components/AuthForms/interfaces";
import { JuridicalApi } from "~/services/juridical";
import { RegStore } from "~/store";

let bankSearchTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);
let addressSearchTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);

export const bankSearch = async ({
    bic,
    clearErrors,
    setValue,
    formValues
}: {
    bic: string;
    clearErrors: any;
    setValue: any;
    formValues: ISignInValues;
}) => {
console.log('bic:', bic);

    clearTimeout(bankSearchTimeout);

    if (bic.length < 9) {
        return;
    }

    bankSearchTimeout = setTimeout(async () => {
        const response = await JuridicalApi.getByBic({ bic });
        console.log('response:', response);

        if (response.items.length > 0) {
            const { bank_name: bankName } = response.items[0];

            clearErrors('bankName');
            RegStore.saveRegData({
                ...formValues,
                bankName
            });
            setValue('bankName', bankName);

            // костыль для визуального обновления содержимого поля
            // разобраться и исправить в следующем релизе
            (document.querySelectorAll('[name="bankName"]')[0] as HTMLInputElement).value = bankName;
        }
    }, 300);
}

export const addressSearch = async ({
    zip,
    clearErrors,
    setValue,
    formValues,
}: {
    zip: string;
    clearErrors: any;
    setValue: any;
    formValues: ISignInValues;
}) => {
    clearTimeout(addressSearchTimeout);

    if (zip.length < 6) {
        return false;
    }

    addressSearchTimeout = setTimeout(async () => {
        const response = await JuridicalApi.getAddressByZip({ zip });

        if (response.items.length > 0) {
            response.items.map(item => {
                const { city } = item;

                if (city) {
                    clearErrors('city');
                    RegStore.saveRegData({
                        ...formValues,
                        city: city
                    });
                    setValue('city', city);

                    // костыль для визуального обновления содержимого поля
                    // разобраться и исправить в следующем релизе
                    (document.querySelectorAll('[name="city"]')[0] as HTMLInputElement).value = city;

                    return false;
                }
            })
        }
    }, 300);
}