import React from 'react';
import LogoAuth from '~/images/logo/logo-auth.svg'

interface IProps {
}

export const AuthLogo:React.FC<IProps> = (props) => {
   const {  } = props;

   return (
        <div className='h-full md:py-17.5 md:px-26 flex flex-col items-center justify-center gap-7 text-center'>
            <img className='dark:hidden' src={LogoAuth} alt='Logo' />           
        </div>
   )
}