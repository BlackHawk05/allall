import { ISignInValues } from "~/components/AuthForms/interfaces";
import { UserApi, UserService, UserStore } from "../user";
import { IRegistration, IUserData } from "../user/interfaces";
import { ITokens } from "./interfaces";
import { callToastError } from "~/utils/callToast";

export const setTokens = (props: ITokens) => {
    const { token, refresh_token } = props;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refresh_token);
}

export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export const getTokens = () => {
    return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    }
}

export const checkAuth = () => {
    if (!localStorage.getItem('accessToken')) {
        return false;
    } else {
        return UserApi.getUserData()
            .then((response: IUserData) => {
                UserStore.saveUserData({...response});
                return true;
            })
            .catch((err: Error) => {
                return false;
            });
    }
}

export const registration = async ({
    formValues,
    data,
    setIsComplite,
}) => {

    return UserApi.registerUser({
        payload: UserService.prepareUserData({
            ...formValues,
            ...data
        })
    })
    .then(() => {
        setIsComplite(true);
    })
    .catch(callToastError)

    // .catch((err: Error) => {
    //     return {
    //         error: err.message
    //     };
    // });
}

