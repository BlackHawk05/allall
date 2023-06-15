import { createStore, createEvent } from 'effector'
import { ISignInValues } from '~/components/AuthForms/interfaces';

const defaultValues: ISignInValues = {
    // fio: 'ivanov ivan ivanich',
    // email: 'email@example.ru',
    // // phone: '77777777777',
    // // phoneString: '+7 (777) 777 77-77',
    // // code: '1111',
    // // inn: '540533102848', //'7728168971', //'540533102848'
    smz: false,
    siteUrl: ''
}

export const saveRegData = createEvent<ISignInValues>();

export const $regValues = createStore(defaultValues).on(saveRegData, (_, data) => data)
