import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import PopoversOne from '../../components/PopoversOne'
import PopoversTwo from '../../components/PopoversTwo'

const Popovers = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Popovers' />

            <div className="flex flex-col gap-7.5">
                <PopoversOne />
                <PopoversTwo />
            </div>
        </DefaultLayout>
    )
}

export default Popovers
