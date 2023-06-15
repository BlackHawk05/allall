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
