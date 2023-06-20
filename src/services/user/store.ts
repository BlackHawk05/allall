import { createStore, createEvent } from 'effector'
import { IUserData } from './interfaces';

export const saveUserData = createEvent<IUserData>();

export const $user = createStore<IUserData>(null).on(saveUserData, (_, data) => data)
