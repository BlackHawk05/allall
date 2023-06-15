export const phoneClear = (phone: string): string => {
    return phone.replace(/\+|\(|\)|-| /g, '');
}