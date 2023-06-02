import { http } from '~/utils/http';
import { IGetByBicResponse, IGetByInnResponse } from './interfaces';

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