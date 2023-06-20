import { ISignInValues } from "~/components/AuthForms/interfaces";

export const strstr = ({
    haystack,
    needle,
    bool
}: {
    haystack: string;
    needle: string;
    bool?: boolean;
}) => {
	var pos = 0;

	pos = haystack.indexOf( needle );
	if( pos == -1 ){
		return false;
	} else{
		if( bool ){
			return haystack.substr( 0, pos );
		} else{
			return haystack.slice( pos );
		}
	}
}

export const phoneClear = (phone: string): string => {
    return phone.replace(/\+|\(|\)|-| /g, '');
}

export const phoneMask = (phone: string): string => {
    var x = phone.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{2})(\d{2})/);
    //return '+7 (' + x[1] + ') ' + x[2] + '-' + x[3];
    return `+7 (${x[1]}) ${x[2]} ${x[3]}-${x[4]}`;
}