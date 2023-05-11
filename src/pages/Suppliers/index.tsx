import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';

export const Suppliers: React.FC = () => {
    // проверка авторизации isAuth

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Поставщики' />

        </DefaultLayout>
    )
}
