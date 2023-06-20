import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import DefaultLayout from '../layout/DefaultLayout'

const NotFound: React.FC = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Страница не найдена' />
        </DefaultLayout>
    )
}

export default NotFound
