import React, { useState } from 'react'
import { useStore } from 'effector-react'

import DropdownUser from '../DropdownUser'
import DarkModeSwitcher from '../DarkModeSwitcher'
import { Link } from 'react-router-dom'
import { SignIn } from '../Signin'
import { UserStore } from '~/services/user'
import Logo from 'src/images/logo/logo-dark.svg'
import { menuList } from './mocks'
import { Notifications } from '../Notifications'


const Header: React.FC = (props) => {
    const user = useStore(UserStore.$user);

    return (
        <header className='sticky top-0 z-999 w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
            <div className={'flex items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11 gap-5'}>
                
                <img src={Logo} alt='Logo' />

                <div className='flex items-stretch justify-between gap-5'>
                    {menuList?.map((item, index) => {
                        return (
                            <Link to={item.sysname} key={index} className='flex-grow font-bold text-center align-middle'
                                //style={{ flex: '1 1 0' }}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </div>

                <Notifications />

                <div className='flex items-center gap-3 2xsm:gap-7'>
                    {user
                        ? <DropdownUser />
                        : <SignIn />
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
