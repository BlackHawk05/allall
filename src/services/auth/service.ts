import { payloadData } from "~/components/AuthForms/helpers";
import { AuthService } from ".";
import { UserApi, UserStore } from "../user";
import { IUserData } from "../user/interfaces";
import { ITokens } from "./interfaces";

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
                UserStore.saveUserData(response);
                return true;
            })
            .catch((err: Error) => {
                AuthService.clearTokens();
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
        payload: payloadData({
            ...formValues,
            ...data
        })
    })
    .then(() => {
        // UserApi.getUserData()
        // .then((response: IUserData) => {
        //     UserStore.saveUserData(response);
            setIsComplite(true);
        // })
        // .catch((err: Error) => {
        //     AuthService.clearTokens();
        //     navigate('/auth/signin');
        // });
    })
    .catch((err: Error) => {
        return {
            error: err.message
        };
    });
}