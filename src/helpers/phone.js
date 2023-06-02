export const phoneClear = (phone) => {
    return phone.replace(/\+|\(|\)|-| /g, '');
}