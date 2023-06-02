import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import DefaultLayout from '../layout/DefaultLayout'

const Settings = () => {
    return (
        <DefaultLayout>
            <div className='mx-auto max-w-270'>
                <Breadcrumb pageName='Страница не найдена' />
            </div>
        </DefaultLayout>
    )
}

export default Settings
