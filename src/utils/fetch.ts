// import 'vite/client';
import axios from 'axios'

interface IProps {
    method?: 'get' | 'post' | 'put' | 'delete';
    params?: any;
    body?: any;
    url: string;
}

export const fetch = async ({ method = 'get', url, params, body }: IProps): Promise<any> => {

    const apiUrl = import.meta.env.VITE_API_URL;
    url = `${apiUrl}${url}`;

    const config = {
        params,
        headers: {
            Authorization: localStorage.getItem('token') && `Bearer ${localStorage.getItem('token')}`
        }
    }

    switch (method) {
        case 'get':
            return await req(axios.get(
                url,
                config
            ))
        
        case 'post':
            return await req(axios.post(
                url,
                body,
                config
            ))

        case 'put':
            break;

        case 'delete':
            break;
    }
    
}

const req = async (send: any) => {
    await send
        .then((response: any) => {

            if (response.status === 401) {

            }
            
            return {
                ...response
            }
        })
        .catch((err: any) => {
            return { err }
        });
}