import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react'

import { $user } from '~/services/user'
import * as Icons from '~/images/icon'
import classNames from 'classnames'
import { clearTokens } from '~/services/auth'

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = useStore($user);

    const trigger = useRef(null)
    const dropdown = useRef(null)

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {            
            if (trigger.current.contains(target) || !dropdown.current) return
            setDropdownOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return
            setDropdownOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    const logOut = () => {
        clearTokens();
        window.location.reload();
    }

    const classes = {
        dropdown: classNames([
            'transition',
            dropdownOpen && 'dropdown-active'
        ]),
        dropdownBlock: classNames([
            'absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'
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
                    <span className='block text-sm font-medium text-black dark:text-white'>
                        {user?.name || 'Thomas Anree'}
                    </span>
                    <span className='block text-xs'>{user?.email || 'UX Designer'}</span>
                </span>

                <span className='rounded-full'>
                    {user?.avatar_url 
                        ? <img src={user?.avatar_url} alt='User' />
                        : <Icons.profileConfirm />
                    }
                </span>

                <span className={classes.dropdown}>
                    <Icons.dropdown />
                </span>
            </div>

            {dropdownOpen
                && <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                    className={classes.dropdownBlock}
                >
                    {/* <div>
                        <div>
                            Профиль
                        </div>
                        <div>
                            Настройки
                        </div>
                    </div> */}
                    <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
                        <li>
                            <Link
                                to='/profile'
                                className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                            >
                                <Icons.profile />
                                Профиль
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/contacts'
                                className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                            >
                                <Icons.contacts />
                                Контакты
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/settings'
                                className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                            >
                                <Icons.settings />
                                Настройки
                            </Link>
                        </li>
                    </ul>
                    <button className='flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                        onClick={() => logOut()}
                    >
                        <Icons.exit />
                        Выйти
                    </button>
                </div>
            }
        </div>
    )
}

export default DropdownUser
