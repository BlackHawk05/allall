import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react'

import { UserStore } from '~/services/user'
import * as Icons from 'src/images/icon'
import classNames from 'classnames'
import { AuthService } from '~/services/auth'

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = useStore(UserStore.$user);
    const { id, short_name, inn } = user?.legal_entity || {};

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (trigger.current.contains(target) || dropdown.current.contains(target)) {
                return false;
            }
            setDropdownOpen(false);
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) {
                return false;
            }
            setDropdownOpen(false);
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    const logOut = () => {
        AuthService.clearTokens();
        window.location.reload();
    }

    const classes = {
        dropdown: classNames([
            'transition',
            dropdownOpen && 'rotate-180'
        ]),
        dropdownBlock: classNames([
            ' mt-7 z-10 absolute -right-3 flex w-fit flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark',
            'transition-all duration-300',
            dropdownOpen ? 'opacity-100' : 'opacity-0 -mr-[100rem]'
        ])
    }
    
    return (
        <div className='relative'>
            <div
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='flex items-center gap-5 cursor-pointer items-center'
            >
                <span className='hidden text-right lg:block'>
                    <span className='block text-sm font-bold text-black dark:text-white'>
                        {user?.legal_entity.short_name}
                    </span>
                    <span className='block text-xs'>{user?.legal_entity.inn}</span>
                </span>
                <span className={classes.dropdown}>
                    <Icons.dropdown />
                </span>
            </div>

            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={classes.dropdownBlock}
            >
                <div className='border-b border-stroke px-5 py-3 flex justify-between'>
                    <div className='text-black font-bold'>
                        Профиль
                    </div>
                    <Link to='/config' className='flex gap-3 items-center'>
                        Настройки
                        <Icons.config className='' />
                    </Link>
                </div>

                <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7.5'>

                    <li className='flex items-center gap-3'>
                        <span className={classes.orgDropdown}>
                            <Icons.dropdown />
                        </span>
                        <div>
                            <div className='text-black flex items-center gap-3 whitespace-nowrap text-sm'>
                                {short_name}
                                <Icons.profileConfirm className='[&>*]:fill-primary w-4 h-4' />
                            </div>
                            <div className='text-lightgray text-xs'>
                                ИНН: {inn} • ID: {id}
                            </div>
                        </div>
                        <Icons.round className='ml-10' />
                    </li>
                </ul>
                {/* <button className='flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                    onClick={() => logOut()}
                >
                    <Icons.exit />
                    Выйти
                </button> */}
                <Link to='' className='flex gap-3 items-center py-4 px-6' onClick={() => logOut()}>
                    <Icons.exit />
                    Выйти
                </Link>
            </div>
        </div>
    )
}

export default DropdownUser
