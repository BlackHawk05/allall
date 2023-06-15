import {createStore, createEvent} from 'effector'
import { IConfig } from './interfaces';

export const saveConfig = createEvent<IConfig>();

export const $config = createStore({}).on(saveConfig, (_, data) => data)
