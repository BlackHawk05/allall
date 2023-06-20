export interface IConfig {
    isMobile?: boolean;
    citizenship?: {
        name: string;
        value: string;
    }[];
    countries?: {
        name: string;
        value: string;
    }[];
    addressType?: {
        name: string;
        value: string;
    }[];
}