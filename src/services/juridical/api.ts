import { http } from '~/utils/http';
import { IGetAddressByZipResponse, IGetByBicResponse, IGetByInnResponse } from './interfaces';

export const getByInn = async ({ inn }): Promise<IGetByInnResponse> => {
    return await http.post<
        {
            query: string;
        },
        IGetByInnResponse
    >(
        '/supplier-profile/legal-informations/get-by-inn',
        {
            query: inn
        }
    );
};

export const getByBic = async ({ bic }): Promise<IGetByBicResponse> => {
    return await http.post<
        {
            query: string;
        },
        IGetByBicResponse
    >(
        '/supplier-profile/banks/get-by-bic',
        {
            query: bic
        }
    );
};

export const getAddressByZip = async ({ zip }): Promise<IGetAddressByZipResponse> => {
    return await http.post<
        {
            query: string;
        },
        IGetAddressByZipResponse
    >(
        '/supplier-profile/address/autocomplete',
        {
            query: zip
        }
    );
};