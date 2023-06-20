import {createStore, createEvent} from 'effector'
import { IConfig } from './interfaces';

const defaultValues: IConfig = {
    citizenship: [
        {
            name: 'RUS',
            value: 'rus'
        },
    ],
    countries: [
        {
            name: 'RUS',
            value: 'RUS'
        },
    ],
    addressType: [
        {
            name: 'Юридический',
            value: 'legal'
        },
        {
            name: 'Почтовый',
            value: 'post'
        },
    ],
}

export const saveConfig = createEvent<IConfig>();

export const $config = createStore({...defaultValues}).on(saveConfig, (_, data) => data)
