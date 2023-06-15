import { createStore, createEvent } from 'effector'
import { ICodeLogin } from '~/services/auth/interfaces';

export const saveUserData = createEvent<ICodeLogin['res']['me']>();

export const $user = createStore(null).on(saveUserData, (_, data) => data)
