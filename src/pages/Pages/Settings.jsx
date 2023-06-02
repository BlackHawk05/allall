import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'

import { FormProfile } from '~/components/Settings/FormProfile'
import { FormAvatar } from '~/components/Settings/FormAvatar'
import { FormOrganization } from '~/components/Settings/FormOrganization'

const Settings = () => {
    return (
        <DefaultLayout>
            <div className='mx-auto max-w-270'>
                <Breadcrumb pageName='Настройки' />

                <div className='grid grid-cols-5 gap-8'>
                    <div className='col-span-5 xl:col-span-3'>
                        <div className='flex flex-col gap-7'>
                            <FormProfile />
                            <FormOrganization />
                        </div>
                    </div>
                    <div className='col-span-5 xl:col-span-2'>
                        <FormAvatar />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Settings
