import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import ModalOne from '../../components/ModalOne';
import ModalTwo from '../../components/ModalTwo';
import ModalThree from '../../components/ModalThree';

const Modals = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Modals' />

            <div className='rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div className='flex flex-wrap justify-center gap-5'>
                    <ModalOne />
                    <ModalTwo />
                    <ModalThree />
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Modals;
