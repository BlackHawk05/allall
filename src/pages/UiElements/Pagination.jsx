import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import PaginationOne from '../../components/PaginationOne'
import PaginationTwo from '../../components/PaginationTwo'
import PaginationThree from '../../components/paginationThree'

const Pagination = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Pagination' />

            <div className="flex flex-col gap-7.5">
                <PaginationOne />
                <PaginationTwo />
                <PaginationThree />
            </div>
        </DefaultLayout>
    )
}

export default Pagination
